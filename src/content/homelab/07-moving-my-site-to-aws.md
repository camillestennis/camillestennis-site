---
title: 'Moving my site to AWS'
entry: 7
date: 2026-10-16
description: 'Migrating camillestennis.com from a no-code builder to Astro on S3, CloudFront, and Route 53, built with Terraform, plus what broke along the way.'
---

### What I did

Today, Oct 16, 2026, I migrated camillestennis.com from Base44, a no-code site builder, to a site I built with Astro and host on AWS.

My first plan was Cloudflare Pages. I switched to AWS because I'm studying AWS and wanted the build to match. Before creating anything, I set a $5 AWS Budget alert.

I rebuilt the site as a static Astro site, with the code in a public GitHub repo. Terraform manages the infrastructure: a private S3 bucket with Block Public Access on, and CloudFront in front of it. Origin Access Control means only my CloudFront distribution can read the bucket.

I added a CloudFront Function to rewrite clean URLs like `/about` to `/about/index.html`. S3 is file storage, so it doesn't do that on its own. I also set up an ACM certificate, validated through DNS, and Route 53 alias records, A and AAAA, for the bare domain and www.

I created the Route 53 hosted zone by hand in the console for practice. Before pointing the domain at it, I tested it with `dig` against the AWS nameservers.

I moved DNS from Squarespace to Route 53 while the old site stayed up, then cut over to CloudFront. The main domain had no downtime.

The hosted zone costs about 50 cents a month. Everything else fits in the free tier.

### What broke

My first `git push` failed with "Repository not found." The repo didn't exist on GitHub yet. I created it from the terminal with the GitHub CLI using `gh repo create`.

`dig` showed eight nameservers for my domain, four `squarespacedns.com` and four `nsone.net`. All eight turned out to be Squarespace defaults. The Squarespace nameserver page wasn't editable, so I had to switch to Squarespace nameservers first, then to custom ones to enter the four Route 53 servers.

Instead of waiting for my own DNS cache to update, I checked the .com registry directly with `dig NS camillestennis.com @a.gtld-servers.net +norecurse`. My cache could hold the old answer for up to 48 hours. The registry check showed me the change in seconds.

During cutover, I had to delete the old www CNAME before Terraform could create the alias records. DNS won't allow a CNAME and an A record on the same name.

My headshot and AWS badge didn't load on the live site. The image files were 0 bytes. `curl` got a redirect but didn't follow it, saved an empty file, and still exited 0. The rest of my command chain kept going. I re-ran it with `-L` to follow redirects and checked file sizes before deploying.

### What I learned

An exit code of 0 means the command didn't error. It doesn't prove I got what I wanted. Check the output, like file size or checksum. It's the same lesson as verifying the OPNsense installer in Entry 04.

Ask the source of truth. Querying the registry directly told me in seconds what my cached DNS could have hidden for hours.

If Terraform manages a resource, change it in Terraform. Editing it in the console creates drift, which the next apply undoes.

Alias records let the bare domain point at CloudFront. A CNAME can't do that.

### What's next

I'll set up GitHub Actions with OIDC so every push builds and deploys automatically, with no AWS keys stored in GitHub.

I'll import the hand-built hosted zone into Terraform with `terraform import`.

I'll cancel Base44 once the new site has run cleanly for a few days.

*Moving a site to AWS too? I'd love to hear what you're working on.*
