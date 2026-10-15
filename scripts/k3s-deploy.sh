#!/usr/bin/env bash
# Build the static site image and apply it to the current kubectl context.
# Intended to run on a machine that can reach the K3s API (homelab node or
# a workstation with a kubeconfig), not from the public cloud agent VM.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE="${IMAGE:-www-cleverbits:local}"
HOST="${K3S_HOST:-www.cleverbits.home.therileys.team}"
NAMESPACE="cleverbits-www"

if ! command -v docker >/dev/null 2>&1 && ! command -v podman >/dev/null 2>&1; then
  echo "Need docker or podman to build ${IMAGE}" >&2
  exit 1
fi

if ! command -v kubectl >/dev/null 2>&1; then
  echo "Need kubectl pointed at the K3s cluster" >&2
  exit 1
fi

ENGINE=docker
if ! command -v docker >/dev/null 2>&1; then
  ENGINE=podman
fi

echo "Building ${IMAGE}"
"${ENGINE}" build -t "${IMAGE}" "${ROOT}"

if command -v k3s >/dev/null 2>&1; then
  echo "Importing ${IMAGE} into k3s containerd"
  "${ENGINE}" save "${IMAGE}" | sudo k3s ctr images import -
else
  echo "k3s CLI not on PATH — ensure ${IMAGE} is available on every node (ctr import or a registry)."
fi

TMP="$(mktemp -d)"
trap 'rm -rf "${TMP}"' EXIT
cp -R "${ROOT}/deploy/k3s/." "${TMP}/"
python3 - "${TMP}/ingress.yaml" "${HOST}" <<'PY'
import pathlib, sys
path = pathlib.Path(sys.argv[1])
host = sys.argv[2]
text = path.read_text()
text = text.replace("www.cleverbits.home.therileys.team", host)
path.write_text(text)
PY

echo "Applying manifests (host=${HOST})"
kubectl apply -k "${TMP}"
kubectl -n "${NAMESPACE}" rollout status deploy/www-cleverbits --timeout=120s
kubectl -n "${NAMESPACE}" get deploy,svc,ingress

echo
echo "Port-forward (no DNS):  kubectl -n ${NAMESPACE} port-forward svc/www-cleverbits 8080:80"
echo "Ingress host:           http://${HOST}/"
