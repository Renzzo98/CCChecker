export const getCardTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'visa':
      return '#1A1F71'; // Visa navy blue
    case 'mastercard':
      return '#FF5F00'; // Mastercard orange
    case 'american express':
      return '#2E77BB'; // Amex blue
    case 'discover':
      return '#FF6000'; // Discover orange
    default:
      return '#333333'; // Default dark gray
  }
}; 