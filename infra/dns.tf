# Cutover: point camillestennis.com and www at CloudFront.
# "Alias" records are Route 53's way of pointing a name at an AWS
# resource. Unlike a CNAME, they work at the apex (camillestennis.com)
# and are free to query.
#
# A = IPv4, AAAA = IPv6 (the distribution has IPv6 enabled).
# allow_overwrite lets Terraform take over the records that were
# first created by hand in the console.

locals {
  site_names = {
    apex = "camillestennis.com"
    www  = "www.camillestennis.com"
  }
}

resource "aws_route53_record" "site_a" {
  for_each        = local.site_names
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = each.value
  type            = "A"
  allow_overwrite = true

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_aaaa" {
  for_each        = local.site_names
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = each.value
  type            = "AAAA"
  allow_overwrite = true

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
