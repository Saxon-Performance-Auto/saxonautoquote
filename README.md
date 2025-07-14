### ✅ Production Deployment (Netlify + IONOS DNS)

#### Main Site
- Domain: [www.saxonperformanceautomotive.com](https://www.saxonperformanceautomotive.com)
- Netlify: saxon-site
- GitHub: github.com/Saxon-Performance-Auto/saxon-site

#### Quote App
- Subdomain: [quote.saxonperformanceautomotive.com](https://quote.saxonperformanceautomotive.com)
- Netlify: saxon-auto-quote
- GitHub: github.com/Saxon-Performance-Auto/saxon-auto-quote

#### DNS (IONOS)
| Type   | Hostname | Value                                      |
|--------|----------|---------------------------------------------|
| A      | @        | 75.2.60.5                                  |
| CNAME  | www      | saxonperformanceautomotive.netlify.app     |
| CNAME  | quote    | saxonautoquote.netlify.app                 |
| MX     | @        | mx01.ionos.com / mx00.ionos.com            |
