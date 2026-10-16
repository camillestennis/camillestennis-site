---
title: 'Changing the plan: from SOC lab to network lab'
entry: 3
date: 2026-09-26
description: 'Why I retired my SOC lab plan and refocused my homelab on networking and the CCNA.'
---

### What I decided

- Retired my plan to build a SOC simulation (Active Directory, Sysmon, Wazuh, attack simulation).
- Refocused the homelab into a network lab, aimed at the CCNA.
- Updated my certification path: AWS Cloud Practitioner, then CompTIA Security+, then CCNA, then AWS Solutions Architect Associate.

### Why

While mapping out the SOC build, I noticed where my attention actually went. Every time I got into the network layer (IP addressing, how traffic moves between machines, VLANs) I wanted to keep going. When the work moved up to the applications and alerts sitting on top of the system, my interest faded. I like the bones of a system. Networking is the part that hooks me, so that's where I'm building.

This isn't a restart. Everything from Entries 01 and 02 still counts: Proxmox, static IPs, SSH, and Docker all live on the network. My Terraform project was VPC work, which is networking in the cloud.

### What's next

- Build my first topologies in Cisco Packet Tracer: switches, routers, VLANs, and subnetting.
- Buy a managed switch (still on the list from Entry 01) and segment my home network.
- Later: run GNS3 or EVE-NG on the Proxmox box for more realistic labs. 16GB of RAM may get tight, so I'm watching that.

*Studying for the CCNA too? I'd love to compare notes.*

**Update, Oct 2026:** I brought Windows and Active Directory back as an IT support lab to match the help desk and field tech roles I'm interviewing for.
