serve:
	npm run dev

migrate:
	npx prisma db push

generate:
	npx prisma generate

setup_db:
	npx prisma db push && npm run seed

seed:
	npm run seed