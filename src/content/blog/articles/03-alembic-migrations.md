---
id: "d9c4b0dc6e30"
slug: "merge-migrations-in-fastapi-alembic-like-djangos-merge"
title: "🚀 Merge Migrations in FastAPI (Alembic) Like Django’s Merge"
publishedAt: "2025-06-24"
author: "Jaswanth"
category: "Databases & migrations"
---

# 🚀 Merge Migrations in FastAPI (Alembic) Like Django’s Merge

When multiple developers are working on different parts of the database schema in a **FastAPI** project (with **SQLAlchemy** + **Alembic**), migration conflicts can occur — just like in **Django**. However, Django gives a direct `makemigrations — merge` command.

So, how do we handle this with Alembic? Let’s walk through it in **2 minutes**.

## 🧠 What’s a Migration Conflict?

Let’s say:

Dev A adds a column `age` to `User`

Dev B adds a column `is_active` to `User`

Both create migrations. Now, Alembic has **two heads** — and doesn’t know which one to pick as the next step.

## 👇 Step-by-step: How to Merge Alembic Migrations

### 1. 🔍 See the Migration Heads

Run:

```bash
alembic heads
```

You’ll see something like:

```text
Rev: abc123 — Add age
Rev: def456 — Add is_active
```

Uh-oh! We’ve got multiple heads.

### 2. 💥 See the Branches now

```bash
alembic branches
```

You’ll see each divergent path.

### 3. ✅ Create a Merge Migration

Now we tell Alembic: “Hey, just merge these two paths.”

```bash
alembic merge -m "merge age and is_active changes" abc123 def456
```

This creates a new migration that merges both.

### 4. 🛠 Apply the Merge

Now simply run:

```bash
alembic upgrade head
```

Done! 🧹 The merge commit becomes the new parent for both diverged branches.

### 💡 Pro Tip

*Use consistent naming and commit migrations quickly to avoid conflicts. Merging often keeps things smooth.*
