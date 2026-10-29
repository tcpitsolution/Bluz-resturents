// Centralized demo data. Verify every item with the restaurant owner before launch.
export const restaurant = {
  name: 'Bluez Restaurant',
  subtitle: 'Candlelight Dinner & Terrace Cafe',
  gujarati: 'બ્લુઝ રેસ્ટોરન્ટ & ટેરેસ કેફે',
  location: 'Ahmedabad, Gujarat, India',
  rating: '4.1',
  reviewCount: '2,429',
  priceRange: '₹200–₹1,400 per person (supplied range; verify before publishing)',
  phoneDisplay: '+91 88988 58988',
  phoneDigits: '918898858988',
  website: 'https://bluez.co.in/',
  cgAddress: '4th Floor, Supermall, 421, Chimanlal Girdharlal Road, near Lal Bunglow, Ellisbridge, Ahmedabad, Gujarat 380006',
  ranchhodraAddress: 'Address to be verified with Bluez team',
  email: 'Email to be confirmed',
  hours: 'Please contact the Bluez team to confirm current opening hours.',
  demo: true
}
export const outlets = [
  { id: 'cg-road', name: 'Bluez — CG Road', address: restaurant.cgAddress, verifiedAddress: true, note: 'CG Road-side outlet listing supplied for this concept.' },
  { id: 'ranchhodra', name: 'Bluez — Ranchhodra', address: restaurant.ranchhodraAddress, verifiedAddress: false, note: 'Address and contact details need owner verification.' }
]
export const experiences = [
  ['Candlelight Dinner','A softly lit setting for an evening that deserves to feel different.','https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85'],
  ['Romantic Date Night','Make room for conversation, thoughtful flavours and time together.','https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'],
  ['Birthday Celebrations','Bring your people together for a birthday worth remembering.','https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85'],
  ['Anniversary Celebrations','Mark another chapter with an evening planned around you.','https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85'],
  ['Private Dining','Ask the team about arrangements for a more intimate gathering.','https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85'],
  ['Family Gatherings','A welcoming place to bring generations around one table.','https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85'],
  ['Corporate Dinners','Enquire about hosting colleagues, clients or team celebrations.','https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'],
  ['Late-Night Requests','Late-night arrangements are enquiry-only and subject to confirmation.','https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1200&q=85'],
  ['Kids’ Birthday Parties','A cheerful gathering planned around your family’s needs.','https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85'],
  ['Proposal & Special Moments','Tell the team what you have in mind and ask what can be arranged.','https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85'],
  ['Bridal Celebrations','Gather friends and family for a memorable pre-wedding occasion.','https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85'],
  ['Group Dining','Share a meal and make a little more space for connection.','https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85']
]
export const menuCategories = ['All','North Indian','Starters','Soups & Salads','Chinese','Fusion Specialities','Vegetarian','Main Course','Rice & Biryani','Breads','Desserts','Beverages']
export const demoMenu = [
  { name:'Smoky Paneer Tikka', category:'Starters', description:'Illustrative menu item with a smoky, spice-forward profile.', vegetarian:true },
  { name:'Garden Fresh Soup', category:'Soups & Salads', description:'Illustrative seasonal soup concept.', vegetarian:true },
  { name:'Bluez House Fusion Bowl', category:'Fusion Specialities', description:'An illustrative fusion dish for the demo menu.', vegetarian:true },
  { name:'North Indian Thali', category:'North Indian', description:'An illustrative North Indian meal selection.', vegetarian:true },
  { name:'Veg Hakka Noodles', category:'Chinese', description:'An illustrative Indo-Chinese favourite.', vegetarian:true },
  { name:'Paneer Lababdar', category:'Main Course', description:'An illustrative rich paneer curry concept.', vegetarian:true },
  { name:'Jeera Rice', category:'Rice & Biryani', description:'An illustrative rice side.', vegetarian:true },
  { name:'Tandoori Roti', category:'Breads', description:'An illustrative bread selection.', vegetarian:true },
  { name:'Chocolate Dessert', category:'Desserts', description:'An illustrative dessert selection.', vegetarian:true },
  { name:'Cold Coffee', category:'Beverages', description:'An illustrative chilled coffee selection.', vegetarian:true }
]
export const faqs = [
 ['How do I reserve a table?','Use the demo enquiry form or contact the Bluez team directly. Submitting this demo form does not confirm a booking.'],
 ['Can I request a candlelight dinner?','You can enquire about a candlelight dinner. Please contact the Bluez team to confirm arrangements, pricing and availability.'],
 ['Can I plan a birthday celebration?','Birthday enquiries are welcome through the celebration form. Setup options and pricing must be confirmed with the restaurant.'],
 ['Do you arrange anniversary decorations?','Please contact the Bluez team to confirm available decoration options and any associated charges.'],
 ['Can I enquire about a marriage proposal?','Yes, you can send an enquiry describing your preferred date, group size and requirements. Arrangements are subject to confirmation.'],
 ['Are corporate and group bookings available?','Use the event enquiry form to share your group size and preferred date. The team can confirm feasibility.'],
 ['Can I request a kids’ party?','You can submit a kids’ party enquiry. Please confirm setup, menu options and policies directly with Bluez.'],
 ['Can I ask for Jain food?','Please contact the restaurant to confirm current Jain food options and preparation requirements.'],
 ['How can I see the menu?','The Menu page contains illustrative demo items only. Ask the Bluez team for the current official menu.'],
 ['How can I find the CG Road outlet?','The supplied CG Road-side address is shown on the Locations page. Please verify the destination before travelling.'],
 ['Where is the Ranchhodra outlet?','The exact Ranchhodra address has not been verified for this demo. Please contact Bluez for the correct location.'],
 ['Can I enquire about late-night events?','Late-night requests are enquiry-only until operating hours and event policies are confirmed.'],
 ['What is the price range?','A range of ₹200–₹1,400 per person was supplied for this concept; confirm current prices with Bluez before visiting.'],
 ['How can I contact Bluez?','The supplied contact number is +91 88988 58988. Please verify that it is the correct WhatsApp number before launch.'],
 ['Can I change or cancel a reservation?','Please contact the Bluez team directly to confirm its current change and cancellation policy.']
]
