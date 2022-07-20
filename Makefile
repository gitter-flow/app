IMAGE=quay.io/gitter/gitter-app
TAG_DEV=latest
DOCKERFILE_DEV=Dockerfile
TAG_PROD=latest
DOCKERFILE_PROD=Dockerfile_prod
BUILD_DIR=.
SOCIAL_API_URL_PROD=http://api.gitter.uk

_build-docker:
	docker build $(BUILD_ARG) -t $(IMAGE):$(TAG) -f $(DOCKERFILE) $(BUILD_DIR)
.PHONY: _build-docker

_deploy-docker:
	docker push $(IMAGE):$(TAG)
.PHONY: _deploy-docker


build-docker-dev:
	$(MAKE) _build-docker TAG=$(TAG_DEV) DOCKERFILE=$(DOCKERFILE_DEV)
.PHONY: build-docker-dev

build-docker-prod:
	$(MAKE) _build-docker BUILD_ARG="--build-arg SOCIAL_API_PROD=$(SOCIAL_API_URL_PROD)" TAG=$(TAG_PROD) DOCKERFILE=$(DOCKERFILE_PROD)
.PHONY: build-docker-prod

deploy-docker-dev:
	$(MAKE) _deploy-docker TAG=$(TAG_DEV)
.PHONY: _deploy-docker-dev

deploy-docker-prod:
	$(MAKE) _deploy-docker TAG=$(TAG_PROD)
.PHONY: deploy-docker-prod

run-docker-dev:
	docker run -p 3000:3000 -v $(PWD):/home/app $(IMAGE):$(TAG_DEV)
.PHONY: run-docker-dev

run-docker-prod:
	docker run -p 80:80 $(IMAGE):$(TAG_PROD)
.PHONY: run-docker-prod