
# Content

- [Content](#content)
- [Overview](#overview)
  - [Get started](#get-started)
    - [Why SQL-like?](#why-sql-like)
    - [Headless ORM?](#headless-orm)
    - [Serverless?](#serverless)
    - [Why not SQL-like?](#why-not-sql-like)
    - [Video Showcase](#video-showcase)
    - [Welcome on board!](#welcome-on-board)
  - [MySQL](#mysql)
  - [PostgreSQL](#postgresql)
  - [SQLite](#sqlite)
- [Manage schema](#manage-schema)
  - [Column types](#column-types)
    - [integer](#integer)
    - [smallint](#smallint)
    - [serial](#serial)
    - [bigint](#bigint)
    - [bigserial](#bigserial)
    - [smallserial](#smallserial)
    - [text](#text)
    - [boolean](#boolean)
    - [char](#char)
    - [varchar](#varchar)
    - [decimal](#decimal)
    - [numeric](#numeric)
    - [double precision](#double-precision)
    - [real](#real)
    - [jsonb](#jsonb)
    - [json](#json)
    - [timestamp](#timestamp)
    - [time](#time)
    - [interval](#interval)
    - [date](#date)
    - [Customizing column data type](#customizing-column-data-type)
    - [enum](#enum)
    - [Default value](#default-value)
    - [Constraints \& defaults](#constraints--defaults)
    - [Primary key](#primary-key)
    - [Not null](#not-null)
  - [Indexes \& Constraints](#indexes--constraints)
    - [Constraints](#constraints)
    - [Default](#default)
    - [Not null](#not-null-1)
    - [Unique](#unique)
    - [Check](#check)
    - [Primary Key](#primary-key-1)
    - [Composite Primary Key](#composite-primary-key)
    - [Foreign key](#foreign-key)
    - [Indexes](#indexes)
  - [Migrations](#migrations)
    - [Quick start](#quick-start)
  - [Views](#views)
    - [Views declaration](#views-declaration)
    - [Declaring views](#declaring-views)
    - [Declaring views with raw SQL](#declaring-views-with-raw-sql)
    - [Declaring existing views](#declaring-existing-views)
    - [Materialized views](#materialized-views)
    - [Extended example](#extended-example)
  - [Schemas](#schemas)
- [Access your data](#access-your-data)
  - [Query](#query)
    - [Modes](#modes)
    - [Declaring relations](#declaring-relations)
    - [One-to-one](#one-to-one)
    - [One-to-many](#one-to-many)
    - [Many-to-many](#many-to-many)
    - [Foreign keys](#foreign-keys)
    - [Foreign key actions](#foreign-key-actions)
    - [Disambiguating relations](#disambiguating-relations)
    - [Querying](#querying)
    - [Find many](#find-many)
    - [Find first](#find-first)
    - [Include relations](#include-relations)
    - [Partial fields select](#partial-fields-select)
    - [Nested partial fields select](#nested-partial-fields-select)
    - [Select filters](#select-filters)
    - [Limit \& Offset](#limit--offset)
    - [Order By](#order-by)
    - [Include custom fields](#include-custom-fields)
    - [Prepared statements](#prepared-statements)
  - [Select](#select)
    - [Basic and partial select](#basic-and-partial-select)
    - [Select with all columns](#select-with-all-columns)
    - [Partial select](#partial-select)
    - [Conditional select](#conditional-select)
    - [Filtering](#filtering)
    - [Combining filters](#combining-filters)
    - [Distinct](#distinct)
    - [Limit \& offset](#limit--offset-1)
    - [Order By](#order-by-1)
    - [WITH clause](#with-clause)
    - [Select from subquery](#select-from-subquery)
    - [Aggregations](#aggregations)
    - [Aggregations helpers](#aggregations-helpers)
  - [Insert](#insert)
    - [Insert one row](#insert-one-row)
    - [Insert returning](#insert-returning)
    - [Insert multiple rows](#insert-multiple-rows)
    - [Upserts and conflicts](#upserts-and-conflicts)
    - [On conflict do nothing](#on-conflict-do-nothing)
    - [On duplicate key update](#on-duplicate-key-update)
  - [Update](#update)
    - [Update with returning](#update-with-returning)
  - [Delete](#delete)
    - [Delete with return](#delete-with-return)
  - [Filters](#filters)
    - [eq](#eq)
    - [ne](#ne)
    - [gt](#gt)
    - [gte](#gte)
    - [lt](#lt)
    - [lte](#lte)
    - [isNull](#isnull)
    - [isNotNull](#isnotnull)
    - [inArray](#inarray)
    - [notInArray](#notinarray)
    - [exists](#exists)
    - [notExists](#notexists)
    - [between](#between)
    - [notBetween](#notbetween)
    - [like](#like)
    - [ilike](#ilike)
    - [notIlike](#notilike)
    - [not](#not)
    - [and](#and)
    - [or](#or)
    - [arrayContains](#arraycontains)
    - [arrayContained](#arraycontained)
    - [arrayOverlaps](#arrayoverlaps)
  - [Joins](#joins)
    - [Join types](#join-types)
    - [Left Join](#left-join)
    - [Right Join](#right-join)
    - [Inner Join](#inner-join)
    - [Full Join](#full-join)
    - [Partial select](#partial-select-1)
    - [Aliases \& Selfjoins](#aliases--selfjoins)
    - [Aggregating results](#aggregating-results)
    - [Many-to-one example](#many-to-one-example)
    - [Many-to-many example](#many-to-many-example)
  - [Magic sql\`\` operator](#magic-sql-operator)
    - [sql“ template](#sql-template)
    - [sql](#sql)
    - [sql\`\`.mapWith()](#sqlmapwith)
    - [sql\`\`.as()](#sqlas)
    - [sql.raw()](#sqlraw)
    - [sql.fromList()](#sqlfromlist)
    - [sql.join()](#sqljoin)
    - [sql.append()](#sqlappend)
    - [sql.empty()](#sqlempty)
    - [Convert sql to string and params](#convert-sql-to-string-and-params)
    - [sql select](#sql-select)
    - [sql in where](#sql-in-where)
    - [sql in orderBy](#sql-in-orderby)
    - [sql in having and groupBy](#sql-in-having-and-groupby)
- [Performance](#performance)
  - [Queries](#queries)
    - [Prepared statement](#prepared-statement)
    - [Placeholder](#placeholder)
  - [Serverless](#serverless-1)
- [Advanced](#advanced)
  - [Set Operations](#set-operations)
    - [Union](#union)
    - [Union All](#union-all)
    - [Intersect](#intersect)
    - [Intersect All](#intersect-all)
    - [Except](#except)
    - [Except All](#except-all)
  - [Transactions](#transactions)
  - [Batch](#batch)
  - [Dynamic query building](#dynamic-query-building)
  - [Read Replicas](#read-replicas)
  - [Custom types](#custom-types)
    - [Examples](#examples)
    - [TS-doc for type definitions](#ts-doc-for-type-definitions)
  - [Goodies](#goodies)
    - [Type API](#type-api)
    - [Logging](#logging)
    - [Multi-project schema](#multi-project-schema)
    - [Printing SQL query](#printing-sql-query)
    - [Raw SQL queries execution](#raw-sql-queries-execution)
    - [Standalone query builder](#standalone-query-builder)
    - [Get typed table columns](#get-typed-table-columns)
    - [Get table information](#get-table-information)
    - [Compare objects types (instanceof alternative)](#compare-objects-types-instanceof-alternative)
- [Extensions](#extensions)
  - [ESLint Plugin](#eslint-plugin)
  - [drizzle-zod](#drizzle-zod)
  - [drizzle-typebox](#drizzle-typebox)
  - [drizzle-valibot](#drizzle-valibot)


# Overview
[Content](#Content)

## Get started
### Why SQL-like?
### Headless ORM?
### Serverless?
### Why not SQL-like?
### Video Showcase
### Welcome on board!
## MySQL
## PostgreSQL
## SQLite

# Manage schema
[Content](#Content)

## Column types
### integer
### smallint
### serial
### bigint
### bigserial
### smallserial
### text
### boolean
### char
### varchar
### decimal
### numeric
### double precision
### real
### jsonb
### json
### timestamp
### time
### interval
### date
### Customizing column data type
### enum
### Default value
### Constraints & defaults
### Primary key
### Not null
## Indexes & Constraints
### Constraints
### Default
### Not null
### Unique
### Check
### Primary Key
### Composite Primary Key
### Foreign key
### Indexes
## Migrations
### Quick start
## Views
### Views declaration
### Declaring views
### Declaring views with raw SQL
### Declaring existing views
### Materialized views
### Extended example
## Schemas

# Access your data
[Overview](#overview)

## Query
### Modes
### Declaring relations
### One-to-one
### One-to-many
### Many-to-many
### Foreign keys
### Foreign key actions
### Disambiguating relations
### Querying
### Find many
### Find first
### Include relations
### Partial fields select
### Nested partial fields select
### Select filters
### Limit & Offset
### Order By
### Include custom fields
### Prepared statements
## Select
### Basic and partial select
### Select with all columns
### Partial select
### Conditional select
### Filtering
### Combining filters
### Distinct
### Limit & offset
### Order By
### WITH clause
### Select from subquery
### Aggregations
### Aggregations helpers
## Insert
### Insert one row
### Insert returning
### Insert multiple rows
### Upserts and conflicts
### On conflict do nothing
### On duplicate key update
## Update
### Update with returning
## Delete
### Delete with return
## Filters
### eq
### ne
### gt
### gte
### lt
### lte
### isNull
### isNotNull
### inArray
### notInArray
### exists
### notExists
### between
### notBetween
### like
### ilike
### notIlike
### not
### and
### or
### arrayContains
### arrayContained
### arrayOverlaps
## Joins
### Join types
### Left Join
### Right Join
### Inner Join
### Full Join
### Partial select
### Aliases & Selfjoins
### Aggregating results
### Many-to-one example
### Many-to-many example
## Magic sql`` operator
### sql“ template
### sql<T>
### sql``.mapWith()
### sql``.as<T>()
### sql.raw()
### sql.fromList()
### sql.join()
### sql.append()
### sql.empty()
### Convert sql to string and params
### sql select
### sql in where
### sql in orderBy
### sql in having and groupBy

# Performance
[Content](#Content)

## Queries
### Prepared statement
### Placeholder
## Serverless

# Advanced
[Content](#Content)

## Set Operations
### Union
### Union All
### Intersect
### Intersect All
### Except
### Except All
## Transactions
## Batch
## Dynamic query building
## Read Replicas
## Custom types
### Examples
### TS-doc for type definitions
## Goodies
### Type API
### Logging
### Multi-project schema
### Printing SQL query
### Raw SQL queries execution
### Standalone query builder
### Get typed table columns
### Get table information
### Compare objects types (instanceof alternative)

# Extensions
[Content](#Content)

## ESLint Plugin 
## drizzle-zod 
## drizzle-typebox 
## drizzle-valibot