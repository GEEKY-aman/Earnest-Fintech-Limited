echo "postgres://6f1ba03f193b1ba6173c392dfb809e647aa704b276b1918aa6fc11f8c75e9d7c:sk_BpbqogS5t0QCGOUVyZhnJ@db.prisma.io:5432/postgres?sslmode=require" | vercel env add DATABASE_URL preview
echo "postgres://6f1ba03f193b1ba6173c392dfb809e647aa704b276b1918aa6fc11f8c75e9d7c:sk_BpbqogS5t0QCGOUVyZhnJ@db.prisma.io:5432/postgres?sslmode=require" | vercel env add DATABASE_URL development

echo "earnest-access-secret-key-change-in-production" | vercel env add JWT_ACCESS_SECRET production
echo "earnest-access-secret-key-change-in-production" | vercel env add JWT_ACCESS_SECRET preview
echo "earnest-access-secret-key-change-in-production" | vercel env add JWT_ACCESS_SECRET development

echo "earnest-refresh-secret-key-change-in-production" | vercel env add JWT_REFRESH_SECRET production
echo "earnest-refresh-secret-key-change-in-production" | vercel env add JWT_REFRESH_SECRET preview
echo "earnest-refresh-secret-key-change-in-production" | vercel env add JWT_REFRESH_SECRET development
