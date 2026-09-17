export const categories = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Accessories',
]

export const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 1999,
    rating: 4.5,
    image:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Immerse yourself in premium sound with these wireless over-ear headphones. Featuring active noise cancellation, 30-hour battery life, and plush ear cushions for all-day comfort.',
    featured: true,
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 2499,
    rating: 4.3,
    image:
      'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Track your fitness, heart rate, and notifications with this sleek smart watch. Water-resistant, with a vibrant display and 7-day battery life.',
    featured: true,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 1299,
    rating: 4.2,
    image:
      'https://images.pexels.com/photos/29581125/pexels-photo-29581125.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Portable bluetooth speaker with deep bass, 12-hour playtime, and IPX7 waterproof rating. Perfect for parties, travel, and outdoor adventures.',
    featured: true,
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 2799,
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/18311171/pexels-photo-18311171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Tactile mechanical keyboard with hot-swappable switches, RGB backlighting, and a sturdy aluminium frame. Built for typing enthusiasts and gamers alike.',
    featured: false,
  },
  {
    id: 5,
    name: 'Classic Sneakers',
    category: 'Fashion',
    price: 1499,
    rating: 4.4,
    image:
      'https://images.pexels.com/photos/4296075/pexels-photo-4296075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Timeless canvas sneakers with a cushioned insole and breathable lining. A versatile pair that goes with every casual outfit.',
    featured: true,
  },
  {
    id: 6,
    name: 'Cotton T-Shirt',
    category: 'Fashion',
    price: 499,
    rating: 4.1,
    image:
      'https://images.pexels.com/photos/8146450/pexels-photo-8146450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Soft 100% combed cotton t-shirt with a regular fit. Pre-shrunk fabric that retains colour wash after wash.',
    featured: true,
  },
  {
    id: 7,
    name: 'Casual Hoodie',
    category: 'Fashion',
    price: 899,
    rating: 4.3,
    image:
      'https://images.pexels.com/photos/19461584/pexels-photo-19461584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Coy pullover hoodie made from a cotton-poly blend. Features a kangaroo pocket, drawstring hood, and ribbed cuffs for a snug fit.',
    featured: true,
  },
  {
    id: 8,
    name: 'Travel Backpack',
    category: 'Accessories',
    price: 1299,
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/20094394/pexels-photo-20094394.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Durable water-resistant travel backpack with a 30L capacity, padded laptop sleeve, and anti-theft pockets. Your ideal companion for daily commutes and weekend trips.',
    featured: true,
  },
  {
    id: 9,
    name: 'Desk Lamp',
    category: 'Home & Living',
    price: 799,
    rating: 4.4,
    image:
      'https://images.pexels.com/photos/31410610/pexels-photo-31410610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Adjustable LED desk lamp with three brightness levels and a warm natural light mode. Energy-efficient and perfect for studying or working late.',
    featured: false,
  },
  {
    id: 10,
    name: 'Coffee Mug',
    category: 'Home & Living',
    price: 299,
    rating: 4.0,
    image:
      'https://images.pexels.com/photos/31785816/pexels-photo-31785816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Handcrafted 350ml ceramic mug with a smooth matte glaze. Microwave and dishwasher safe — great for your morning brew.',
    featured: false,
  },
]

export const categoryImages = {
  Electronics:
    'https://images.pexels.com/photos/8219211/pexels-photo-8219211.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  Fashion:
    'https://images.pexels.com/photos/8743972/pexels-photo-8743972.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  'Home & Living':
    'https://images.pexels.com/photos/11784605/pexels-photo-11784605.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  Accessories:
    'https://images.pexels.com/photos/2748239/pexels-photo-2748239.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
}

export const heroImage =
  'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940'

export function getProductById(id) {
  return products.find((p) => p.id === Number(id))
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}
