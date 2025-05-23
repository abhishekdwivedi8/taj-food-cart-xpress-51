
import Cookies from 'js-cookie';

export const updateOrderHistoryCookieAfterPayment = (orderId: string) => {
  try {
    // Get existing order history cookie
    const historyJson = Cookies.get('restaurant_order_history');
    if (!historyJson) return;
    
    const history = JSON.parse(historyJson);

    if (Array.isArray(history)) {
      // Mark the order as paid but DO NOT remove it from history yet
      const updatedHistory = history.map(order => {
        if (order.id === orderId) {
          return { ...order, isPaid: true, status: 'completed' };
        }
        return order;
      });
      
      // Update the cookie with the modified history - maintain the same expiry
      Cookies.set('restaurant_order_history', JSON.stringify(updatedHistory), { expires: 30 });
    }
  } catch (error) {
    console.error('Error updating order history cookie:', error);
  }
};

// Add additional utility to ensure we never lose order history
export const ensureOrderHistoryPersistence = () => {
  try {
    // Get existing order history cookie
    const historyJson = Cookies.get('restaurant_order_history');
    
    if (!historyJson) {
      // If no cookie exists, create an empty one
      Cookies.set('restaurant_order_history', JSON.stringify([]), { expires: 30 });
    }
  } catch (error) {
    console.error('Error ensuring order history persistence:', error);
  }
};

// New function to completely clear order history cookie
export const clearOrderHistoryCookie = () => {
  try {
    // Remove the cookie completely
    Cookies.remove('restaurant_order_history');
    
    // Also clear from localStorage to ensure full cleanup
    localStorage.removeItem('restaurant_order_history');
    
    console.log('Order history cleared successfully');
  } catch (error) {
    console.error('Error clearing order history cookie:', error);
  }
};
