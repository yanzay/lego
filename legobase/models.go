package legobase

// Product is a common product model
type Product struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	Category    string `json:"category"`
}

// Order incapsulates line items and user contact information
type Order struct {
	ID        int        `json:"id"`
	Name      string     `json:"name"`
	Phone     string     `json:"phone"`
	City      string     `json:"city"`
	Address   string     `json:"address"`
	LineItems []LineItem `json:"line_items"`
}

// LineItem connects order with products
type LineItem struct {
	ID        int `json:"id"`
	OrderID   int `json:"order_id"`
	ProductID int `json:"product_id"`
	Count     int `json:"count"`
}
