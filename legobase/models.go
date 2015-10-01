package legobase

type Product struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	Category    string `json:"category"`
}

type Order struct {
	Id        int        `json:"id"`
	Name      string     `json:""`
	Phone     string     `json:"phone"`
	City      string     `json:"city"`
	Address   string     `json:"address"`
	LineItems []LineItem `json:"address"`
}

type LineItem struct {
	Id        int `json:"id"`
	OrderId   int `json:"order_id"`
	ProductId int `json:"product_id"`
	Count     int `json:"count"`
}
