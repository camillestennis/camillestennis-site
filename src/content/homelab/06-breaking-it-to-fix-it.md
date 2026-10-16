---
title: Breaking it to fix it
entry: 6
date: 2026-10-06
description: 'Working four deliberate failures as tickets: wrong DNS, a stopped DHCP service, an offline domain controller, and an account lockout.'
---

### What I broke

I worked four failures as tickets. With wrong DNS on the workstation, domain login failed while the domain controller still answered pings. When I stopped the DHCP service, the workstation gave itself a 169.254 address. With the domain controller offline, users who had signed in before got in with cached credentials, but new users couldn't. "No internet" was really no DNS. For an account lockout, I verified identity, then unlocked the account.

### What surprised me

My first DNS break didn't show up at all. Cached lookups kept working until a reboot. That's exactly how "it worked yesterday" tickets happen.

### What's next

A second domain controller would remove the single point of failure. BitLocker encryption and a full Windows reinstall are next in the lab.
