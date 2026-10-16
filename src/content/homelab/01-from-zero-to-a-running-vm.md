---
title: From zero to a running VM
entry: 1
date: 2026-09-22
description: 'Building a $188 homelab from scratch, installing Proxmox VE, and getting my first Ubuntu Server VM running over SSH.'
---

### What I did

- Sourced and assembled a full homelab rig from scratch: a $188 refurbished Dell OptiPlex 3060 SFF, a monitor, keyboard/mouse, and a dual-connector USB drive, all bought used or on a budget.
- Wired the machine into my home network, confirmed the NIC and static IP entirely from the command line before ever touching a browser.
- Installed Proxmox VE (a bare-metal hypervisor) directly onto the hardware, configured with a static IPv4 address instead of the default IPv6.
- Created and installed my first virtual machine (Ubuntu Server 24.04), fully isolated from the host.
- Set up SSH so I can manage that VM entirely from my laptop, no monitor or keyboard required going forward.

### What broke / what I learned

- My HDMI cable didn't fit the OptiPlex's port. Turned out the "HDMI" label on the refurb listing was wrong: it was actually DisplayPort. Fell back to VGA for the one-time setup screen instead of buying the wrong adapter twice.
- balenaEtcher (the tool I planned to use to flash my installer USB) threw a bug on both local file and URL flashing. Skipped it entirely and used `dd` via Terminal instead, which is honestly the more "real" way people do this anyway.
- Learned the hard way that Proxmox's default free-tier repo setup throws update errors until you manually disable the enterprise repos, an easy one-line fix once I knew to look for it, but not obvious from the UI alone.
- Biggest lesson: almost nothing about this was plug-and-play. Every step had a small decision to make or a small thing to debug, which is exactly the muscle I'm trying to build for SOC work.

### What's next

- Install Docker on the Ubuntu VM and get my first containerized service running.
- Buy a managed switch and start segmenting my network into VLANs.
- Eventually: build out log aggregation so I can practice actually monitoring what I've built, not just running it.

*Following along or building your own? I'd love to hear what you're working on.*
