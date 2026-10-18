---
title: "Building a Linux File Server for a Production Team"
entry: 8
date: 2026-10-17
description: "Users, groups, and permissions on Ubuntu 24.04, built from chapters 1-9 of The Linux Command Line."
---

I've run production teams for years. Today I built the server one would work from.

### What I did

I set up a shared file server on Ubuntu 24.04 for a fictional podcast team. Two shows. Six episodes. Raw, edit, and final folders for each one, built with a single brace expansion command.

Then I locked it down. Three users, two groups, three levels of access. A producer who can reach everything. An editor who can work in the shows but can't touch the archive. An outsider who can see the front door and nothing behind it.

I didn't stop at setting permissions. I tested them as each user and saved the results. Six tests. All six matched.

### What broke

- A typo gave a user the shell `/bing/bash`. She couldn't have logged in. I found it in `/etc/passwd` and fixed it.
- `usermod -G` without `-a` wiped a user's groups. On an admin account, that's how you lose sudo.
- `sudo -u` asked for a password that doesn't exist. `sudo -l` showed why: my account could only run commands as root. I switched to `runuser`.
- Wildcards stopped working once folders were locked, because they expand as you. Files first, then folders.

### What I learned

Setgid puts new files in the right group. Umask decides whether that group can edit them. A shared folder needs both. I proved it: one teammate created two files, and the other could edit only one of them.

### What's next

Chapters 10 and up: processes, the environment, and shell scripting. The runbook in this repo is a list of commands right now. Next, it becomes a script.

[View the repo on GitHub](https://github.com/camillestennis/linux-production-server)