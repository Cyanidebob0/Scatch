# Database Schema

## Collections

### Users

```javascript
{
  _id: ObjectId,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date
}
```

### Products

```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  description: String,
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  category: String,
  imageUrl: String,
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Orders

```javascript
{
  _id: ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  payment: {
    method: String,
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    amount: Number,
    currency: { type: String, default: 'USD' },
    paidAt: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## Indexes

### Users Collection

- `email`: Unique index
- `username`: Unique index
- `createdAt`: TTL index for inactive users (optional)

### Products Collection

- `name`: Text index for search
- `category`: Index for filtering
- `price.amount`: Index for sorting
- `createdAt`: Index for sorting

### Orders Collection

- `user`: Index for user order history
- `status`: Index for filtering
- `createdAt`: Index for sorting
- `'items.product'`: Index for order items lookup

## Relationships

1. **User to Orders**: One-to-Many

   - A user can have many orders
   - Reference: `Order.user` → `User._id`

2. **Order to Products**: Many-to-Many through Order Items
   - An order can contain multiple products
   - A product can be in multiple orders
   - Reference: `Order.items.product` → `Product._id`

## Data Validation

- All required fields are validated at the schema level
- Email format validation using regex
- Price and quantity validations to ensure non-negative values
- Enum validations for status fields
- Timestamps for creation and updates

## Data Security

- Passwords are hashed using bcrypt before saving
- Sensitive fields are excluded from query results by default
- Input sanitization to prevent NoSQL injection
- Role-based access control for sensitive operations
