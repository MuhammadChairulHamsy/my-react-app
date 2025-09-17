import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);
  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      totalPriceRef.current.style.display = "";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  const handleDeleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <>
      <table className="table-fixed w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 border border-gray-300 p-1">Nama</th>
            <th className="w-1/6 border border-gray-300 p-1">Price</th>
            <th className="w-1/6 border border-gray-300 p-1">Qty</th>
            <th className="w-1/4 border border-gray-300 p-1">Total</th>
            <th className="w-1/6 border border-gray-300 p-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2 truncate">
                {item.title}
              </td>
              <td className="border border-gray-300 p-2">${item.price}</td>
              <td className="border border-gray-300 p-2">{item.qty}</td>
              <td className="border border-gray-300 p-2">
                ${item.total.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDeleteFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr ref={totalPriceRef}>
            <td className="border border-gray-300 text-center p-2" colSpan={5}>
              <b>Total Price:</b> ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
