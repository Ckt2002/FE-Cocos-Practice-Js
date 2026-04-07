# Clothing Shop Management System - System Analysis

Documentation analyzing data structures and online services for a clothing management system (Next.js, NestJS, TypeScript).

## Features

- Login/Register; Logout.
- Group products by type.
- Group orders (provider and customer) by day.
- Add filter for product, orders, customer.
- Find product/staff/provider/customer by name.

**Staff:**

- Handle order from customer (Sell products).
- Create receive order from provider.

**Staff-accountant:** (maybe update later or let manager handle this role):

- Manage storage.
- Check/note income in a day.
- Note spend money for receive product.
- Create income/storage report

**Manager:**

- Do anything staff can do.
- Check income in day/week/month/3 months/year.
- Create/Cancel order to provider.
- Manage: product, staff, customer(read only), color, product type, provider, brand.

## Tables

### 👥 User & Role Management

Core entities for authentication, authorization, and partner tracking.

| Table        | Attributes                                                                                  |
| :----------- | :------------------------------------------------------------------------------------------ |
| **Staff**    | `ID`, `staffID`, `fullName`, `age`, `gender`, `address`, `phoneNumber`, `role`, `isWorking` |
| **Customer** | `ID`, `fullName`, `phoneNumber`                                                             |
| **Provider** | `ID`, `name`, `address`, `phoneNumber`                                                      |
| **Role**     | `ID`, `name` (e.g., Manager, Seller)                                                        |

### 👕 Product & Inventory

Standardized product structure with multi-attribute classification.

| Table           | Attributes                                                          |
| :-------------- | :------------------------------------------------------------------ |
| **Product**     | `ID`, `name`, `price`, `quantity`, `color`, `type`, `brand`, `size` |
| **Size**        | `ID`, `name` (e.g., S, M, L, XL)                                    |
| **Brand**       | `ID`, `name` (e.g., Nike, Zara, Local Brand)                        |
| **Color**       | `ID`, `name` (e.g., Black, White, Navy)                             |
| **ProductType** | `ID`, `name` (e.g., T-Shirt, Jeans, Hoodie)                         |

### 📦 Inbound Logistics

Handles the workflow from ordering to physical stock reception.

#### 1. Order to Provider

| Table                   | Attributes                                     |
| :---------------------- | :--------------------------------------------- |
| **PurchaseOrder**       | `ID`, `createdDate`, `IDManager`, `IDProvider` |
| **PurchaseOrderDetail** | `ID`, `IDOrderTP`, `IDProduct`, `quantity`     |

#### 2. Receive Goods from Provider

| Table                  | Attributes                                                 |
| :--------------------- | :--------------------------------------------------------- |
| **GoodsReceipt**       | `ID`, `createdDate`, `totalPrice`, `IDStaff`, `IDProvider` |
| **GoodsReceiptDetail** | `ID`, `IDReceiveFP`, `IDProduct`, `quantity`, `price`      |

### 🛒 Sales Management

Handles customer transactions and order cancellations.

| Table                   | Attributes                                                  |
| :---------------------- | :---------------------------------------------------------- |
| **CustomerOrder**       | `ID`, `IDCustomer`, `totalPrice`, `IDStaff`, `cancelReason` |
| **CustomerOrderDetail** | `ID`, `IDOrderFC`, `IDProduct`, `quantity`, `price`         |

> **Note:** The `cancelReason` field is crucial for analyzing churn and inventory issues.
