---
title: "Building a Concourse Signage System"
entry: 10
date: 2026-10-27
description: "A menu board, a sponsor spot, and an open-source signage CMS on my homelab, scheduled by event phase onto a Windows player."
---

I've spent years making content. Today I built the system that puts it on a screen.

### What I did

I built a digital signage pipeline for a fictional stadium concourse, start to finish, with free tools.

The content side: a concessions menu board designed in Photopea, animated in DaVinci Resolve's Fusion page, and a 15-second sponsor spot for a made-up brand, Rinkside Grill. Everything exported as H.264 at 1080p, 29.97. Before anything touched a screen, I checked every file in MediaInfo from the terminal: codec, resolution, frame rate, bitrate, audio track.

The system side: Xibo, an open-source signage CMS, running in Docker on a new Ubuntu VM in Proxmox, behind my OPNsense firewall. The screen is a Windows player on my Active Directory domain. I built three layouts and scheduled them by event phase: Doors Open, In Game, Postgame. Then I watched the screen switch on its own.

### What broke

- A sponsor-style ProRes file wouldn't upload. Xibo's video module only allows wmv, avi, mpg, mpeg, webm, and mp4, so the .mov was grayed out in the file picker. I transcoded it to H.264 in Shutter Encoder instead of adding .mov to the list. Renaming a file changes the label, not the codec.
- The transcode came out at H.264 Level 5.1. A 1080p, 29.97 file only needs Level 4.1, and some older players won't take more. Same codec, different spec.
- My Mac couldn't reach the new VM. First fix: a WAN rule in OPNsense. Second fix: the firewall's logs showed traffic passing in but replies never coming back. OPNsense was sending them to my home router instead (reply-to). Disabling reply-to on WAN rules fixed it.
- Mid-install, every VM in my lab froze at once. The LVM thin pool hit 100% while Docker pulled images. Old snapshots with saved RAM were holding most of the space. I extended the pool, resumed every VM, and deleted the snapshots I didn't need. 100% down to about 51%.
- After the freeze, the player's clock ran about 7 minutes behind. Paused VMs don't keep time, and a signage schedule runs on the player's clock.

### What I learned

Check the file before you check the player. MediaInfo answered most of my playback questions before I ever opened the CMS.

A firewall rule passing traffic doesn't mean the conversation works. The logs showed the packet getting in. The fix was the way back out.

Thin provisioning is a promise, not storage. My VM disks were promised about 712 GB on a 156 GB pool. Snapshots with RAM made it worse. Next time I take one, I uncheck Include RAM.

### What's next

Sync the lab clocks to a real time source, add a sponsor-only daypart, and write a pre-event QC checklist for the screens.

[Watch the demo on YouTube](https://youtu.be/APqCNbalGUM)
