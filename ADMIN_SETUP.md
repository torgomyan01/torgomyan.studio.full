# Admin Authentication Setup

Այս փաստաթուղթը բացատրում է, թե ինչպես կարգավորել ադմինի մուտքը:

## Կարգավորում

### 1. Գեներացրեք գաղտնաբառի hash

Օգտագործեք ներառված script-ը գաղտնաբառի hash ստեղծելու համար:

```bash
node scripts/generate-admin-password.js "your_secure_password_here"
```

Script-ը կտա ձեզ հետևյալ արժեքները:

- `ADMIN_PASSWORD_HASH` - bcrypt hash
- `ADMIN_JWT_SECRET` - JWT secret key

### 2. Ավելացրեք .env ֆայլում

Ավելացրեք հետևյալ փոփոխականները ձեր `.env` ֆայլում:

```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=$2b$12$...your_hash_here...
ADMIN_JWT_SECRET=...your_jwt_secret_here...
```

**⚠️ ԿԱՐԵՎՈՐ:**

- Երբեք մի commit արեք `.env` ֆայլը version control-ում
- Օգտագործեք ուժեղ գաղտնաբառ (առնվազն 8 նիշ)
- Production-ում օգտագործեք տարբեր credentials

### 3. Ստուգեք ձեր գաղտնաբառը

Նախքան մուտք գործելը, կարող եք ստուգել, որ ձեր գաղտնաբառը ճիշտ է:

```bash
node scripts/test-admin-password.js "your_password"
```

### 4. Մուտք

Ադմինի մուտքը հասանելի է `/admin/login` հասցեով:

**Կարևոր:** Եթե ստանում եք "Invalid credentials" սխալ:

1. Ստուգեք, որ `.env` ֆայլում `ADMIN_USERNAME` և `ADMIN_PASSWORD_HASH` արժեքները ճիշտ են
2. Restart արեք Next.js development server-ը (`npm run dev`)
3. Ստուգեք, որ մուտքագրում եք ճիշտ username և password
4. Օգտագործեք `test-admin-password.js` script-ը ձեր գաղտնաբառը ստուգելու համար

## Անվտանգության առանձնահատկություններ

1. **Server-side validation** - Բոլոր ստուգումները կատարվում են սերվերի կողմից
2. **Bcrypt hashing** - Գաղտնաբառերը պահվում են hashed տեսքով
3. **JWT tokens** - Secure HTTP-only cookies-ով
4. **Rate limiting** - 5 անհաջող փորձից հետո 15 րոպե lockout
5. **Timing attack protection** - Constant-time comparison
6. **HTTPS only cookies** - Production-ում

## API Endpoints

- `POST /api/admin/login` - Մուտք
- `POST /api/admin/logout` - Ելք
- `GET /api/admin/verify` - Ստուգել authentication status

## Protected Routes

Բոլոր `/admin/*` routes-ները պաշտպանված են և պահանջում են authentication (բացի `/admin/login`-ից):
