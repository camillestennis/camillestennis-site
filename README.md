# camillestennis.com

My portfolio site. Built with Astro, hosted on AWS, and provisioned with Terraform.

Live at [camillestennis.com](https://camillestennis.com)

## What's on it

- **Home:** background, certifications, and projects
- **Homelab Log:** write-ups of my Proxmox homelab build, one entry per milestone, from the first VM through the firewall, the Active Directory domain, break/fix drills, and a concourse signage system
- **Production:** my media production work
- RSS feed and sitemap

## Architecture

```
Browser -> Route 53 (camillestennis.com) -> CloudFront (HTTPS) -> S3 bucket (private)
```

- **S3** stores the built static site. The bucket is private: public access is blocked, and only CloudFront can read from it through Origin Access Control (SigV4 signed requests).
- **CloudFront** serves the site over HTTPS, redirects HTTP to HTTPS, requires TLS 1.2 or newer, and uses AWS's managed caching-optimized policy. Price class 100 keeps it to edge locations in North America and Europe to hold cost down.
- **CloudFront Function** runs on every viewer request and rewrites clean URLs like `/homelab/some-entry/` to the `index.html` file S3 actually stores.
- **ACM** issues the TLS certificate in us-east-1 (CloudFront requires that region), validated with DNS records in Route 53.
- **Route 53** A and AAAA alias records point the domain at the distribution, so it answers on IPv4 and IPv6.

All of it is defined in Terraform in `infra/`. The Route 53 hosted zone was created outside Terraform, so the config looks it up as a data source.

## Deploying

```
npm run deploy
```

This builds the site, syncs `dist/` to the S3 bucket (removing files that no longer exist), and invalidates the CloudFront cache so changes show up right away. It needs the AWS CLI configured with access to the bucket and distribution.

## Running locally

```
npm install
npm run dev
```

The dev server runs at `localhost:4321`.

## Project structure

```
infra/                 Terraform: S3, CloudFront, CloudFront Function, ACM, Route 53
src/content/homelab/   Homelab Log entries (Markdown)
src/pages/             Home, Production, Homelab Log routes, RSS
src/components/        Shared head tags and the contact form
public/images/         Cert badges, headshot, lab diagrams
```

Started from the Astro blog starter.
