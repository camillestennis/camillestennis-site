---
title: Docker + my first container, explained without the jargon
entry: 2
date: 2026-09-24
description: 'Installing Docker and Portainer on my Ubuntu VM and deploying a first container, with a plain-English explanation of VMs versus containers.'
---

### What I did

- Installed Docker on my Ubuntu VM (the virtual computer I built last time).
- Set up Portainer, a dashboard that lets me see and manage everything Docker is running, without typing commands for every little thing.
- Deployed my first container: a small web server running a test page.

### The plain-English version

Think of my physical computer as an apartment building. Proxmox (the software I installed directly on the hardware) is what let me carve that building into separate apartments, each one a fully independent "unit" with its own walls, its own everything. My Ubuntu VM is one of those apartments.

Docker works differently, and inside that one apartment. Instead of building more walls, Docker is more like buying a bunch of matching, ready-to-go furniture sets, each one a "container", and dropping them into different rooms of the same apartment. Each one is self-contained and comes with everything it needs already assembled, but they're all still sharing the same electricity and plumbing (the apartment's operating system) underneath. That's the real difference between a VM and a container: a VM is its own separate apartment, a container is a self-sufficient room inside one.

Portainer, then, is just the building manager's clipboard, a single dashboard where I can see every "furniture set" I've dropped in, check if it's working, and add or remove them, instead of manually checking each room myself.

For today's test, the "furniture set" I dropped in was a basic webpage. Not exciting on its own, but it proved the whole chain works: hardware, to virtual apartment, to container, to something visibly running that I could pull up in a browser.

### What broke / what I learned

- Portainer's first-time setup has a short security timer. If you don't finish creating your admin account fast enough, it locks you out and you have to restart it and grab a fresh access code. Mildly chaotic, but a good reminder that even setup screens are built with security-first thinking.
- Small syntax trip-up: typing `$actualname` instead of `$USER` in a command. In this world, a `$` in front of something means "look up this stored value," not "insert this literal word." One character, big difference in outcome, exactly the kind of precision this field rewards.

### What's next

- Get more comfortable deploying containers through Portainer's interface.
- Start building toward the bigger picture: a mock "company" (a fake office network) inside my homelab, complete with its own user accounts and machines, so I can practice real security monitoring on something realistic instead of just an empty VM.
