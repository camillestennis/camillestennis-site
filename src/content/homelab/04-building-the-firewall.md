---
title: Building the firewall
entry: 4
date: 2026-10-05
description: 'Installing OPNsense as the gateway to an isolated lab network, and troubleshooting a truncated image, a rogue DHCP risk, and a lockout.'
---

### What I did

I created an isolated lab network bridge in Proxmox and installed OPNsense as the gateway between my home network and the lab. I set up NAT, DHCP, and DNS.

### What broke

The first install failed with disk read errors because the installer image was truncated during upload. I downloaded it directly to the server and verified it with a SHA-256 checksum. The default config briefly put the firewall's LAN side on my home network, using my home router's address range. That created a rogue DHCP risk, so I disconnected it until I reassigned the interfaces. After the setup wizard, I was locked out of the firewall's web interface. The browser said "timed out," not "refused," which told me packets were being silently dropped. I wrote a narrow rule allowing HTTPS only from my home network.

### What I learned

I verify images before installing. "Timed out" versus "refused" helps me tell a firewall problem from a dead service. I also traced a packet hop by hop through two layers of NAT.
