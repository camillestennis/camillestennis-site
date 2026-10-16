---
title: Standing up the domain
entry: 5
date: 2026-10-06
description: 'Building a Windows Server 2025 domain controller, migrating DHCP off the firewall, and joining a Windows 11 workstation to the domain.'
---

### What I did

I built a Windows Server 2025 domain controller with a static IP and promoted it to a new Active Directory forest. I set DNS forwarding to the firewall and added a reverse lookup zone. I migrated DHCP from the firewall to the domain controller in a planned order, avoiding two DHCP servers on one network. I built a Windows 11 workstation, joined it to the domain, and created a user who must change their password at first login. I confirmed the login went through the domain controller.

### What broke

Neither Windows installer could see the disk or network until I loaded VirtIO drivers. A health check, `dcdiag`, flagged two failures. Their timestamps matched the first reboot after promotion. I confirmed the services were working before calling them startup noise.

### What I learned

Active Directory lives and dies by DNS. That's why the domain controller hands out its own address as the DNS server.
