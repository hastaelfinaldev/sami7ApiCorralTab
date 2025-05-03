require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
const db = {}
const SQLite = require('sqlite3')
const moment = require('moment');
require('moment/locale/es');


db.connection = new Sequelize(
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DIALECT,
        define: {
            charset: 'utf8',
            collate: 'utf8_spanish_ci',
            timestamps: true
        },
        logging: false // Desactivar logs de SQL
    }
)

db.Profiles = require('./models/profiles')(db.connection, DataTypes)
db.Users = require('./models/users')(db.connection, DataTypes)
db.Records = require('./models/records')(db.connection, DataTypes)
db.Categories = require('./models/categories')(db.connection, DataTypes)
db.Subcategories = require('./models/subcategories')(db.connection, DataTypes)
db.Providers = require('./models/providers')(db.connection, DataTypes)
db.Customers = require('./models/customers')(db.connection, DataTypes)
db.Taxes = require('./models/taxes')(db.connection, DataTypes)
db.PurchasePrices = require('./models/purchasePrices')(db.connection, DataTypes)
db.TaxPurchasePrices = require('./models/taxPurchasePrices')(db.connection, DataTypes)
db.PriceLists = require('./models/priceLists')(db.connection, DataTypes)
db.SellingPrices = require('./models/sellingPrices')(db.connection, DataTypes)
db.TaxSellingPrices = require('./models/taxSellingPrices')(db.connection, DataTypes)
db.Storages = require('./models/storages')(db.connection, DataTypes)
db.Products = require('./models/products')(db.connection, DataTypes)
db.Stocks = require('./models/stocks')(db.connection, DataTypes)
db.StockMovements = require('./models/stockMovements')(db.connection, DataTypes)
db.SalePoints = require('./models/salePoints')(db.connection, DataTypes)
db.CashRegisters = require('./models/cashRegisters')(db.connection, DataTypes)
db.Sales = require('./models/sales')(db.connection, DataTypes)
db.CashRegisterMovements = require('./models/cashRegisterMovements')(db.connection, DataTypes)
db.PaymentMethods = require('./models/paymentMethods')(db.connection, DataTypes)
db.SaleDetails = require('./models/saleDetails')(db.connection, DataTypes)
db.CustomerAccountMovements = require('./models/customerAccountMovements')(db.connection, DataTypes)
db.Payments = require('./models/payments')(db.connection, DataTypes)
db.CreditNotes = require('./models/creditNotes')(db.connection, DataTypes)
db.Purchases = require('./models/purchases')(db.connection, DataTypes)
db.PurchasesDetails = require('./models/purchasesDetails')(db.connection, DataTypes)
db.Receptions = require('./models/receptions')(db.connection, DataTypes)
db.ProductCards = require('./models/productCards')(db.connection, DataTypes)
db.PaymentsProviders =  require('./models/paymentsProviders')(db.connection, DataTypes)
db.ProviderAccountMovements = require('./models/providerAccountMovements')(db.connection, DataTypes)


db.Users.belongsTo(db.Profiles)
db.Subcategories.belongsTo(db.Categories)
db.Records.belongsTo(db.Users)
db.SellingPrices.belongsTo(db.PriceLists)

db.Products.belongsTo(db.Subcategories)
db.Products.belongsTo(db.PurchasePrices)

db.CashRegisters.belongsTo(db.SalePoints)
db.CashRegisters.hasMany(db.CashRegisterMovements)

db.CashRegisterMovements.belongsTo(db.CashRegisters)
db.CashRegisterMovements.belongsTo(db.PaymentMethods)
db.CashRegisterMovements.belongsTo(db.Users)

db.Products.hasMany(db.Stocks)
db.Products.hasMany(db.SellingPrices)

db.PurchasePrices.belongsTo(db.Providers)

db.SellingPrices.belongsTo(db.Products)

db.SalePoints.hasMany(db.CashRegisters)

db.Stocks.belongsTo(db.Storages)
db.SalePoints.belongsTo(db.Storages)

db.StockMovements.belongsTo(db.Products)
db.StockMovements.belongsTo(db.Storages)
db.StockMovements.belongsTo(db.Users)

db.Sales.belongsTo(db.Users)
db.Sales.belongsTo(db.Customers)

db.SaleDetails.belongsTo(db.Sales)
db.SaleDetails.belongsTo(db.Products)


db.CustomerAccountMovements.belongsTo(db.Customers)
db.CustomerAccountMovements.belongsTo(db.Users)

db.ProviderAccountMovements.belongsTo(db.Providers)
db.ProviderAccountMovements.belongsTo(db.Users)

db.CreditNotes.belongsTo(db.Users)
db.CreditNotes.belongsTo(db.Customers)


db.Payments.belongsTo(db.Sales)
db.Payments.belongsTo(db.Users)
db.Payments.belongsTo(db.PaymentMethods)
db.Payments.belongsTo(db.Customers)
db.Payments.belongsTo(db.CashRegisterMovements)

db.PurchasesDetails.belongsTo(db.Products)

db.Purchases.belongsTo(db.Users)
db.Purchases.belongsTo(db.Providers)
db.Purchases.hasMany(db.PurchasesDetails)

db.PurchasesDetails.belongsTo(db.Purchases)
db.PurchasesDetails.belongsTo(db.Products)


db.ProductCards.belongsTo(db.Products)

db.PaymentsProviders.belongsTo(db.Users)
db.PaymentsProviders.belongsTo(db.Providers)
db.PaymentsProviders.belongsTo(db.PaymentMethods)

db.ProviderAccountMovements.belongsTo(db.Providers)
db.ProviderAccountMovements.belongsTo(db.Users)






db.PurchasePrices.belongsToMany(db.Taxes, { through: db.TaxPurchasePrices })
db.Taxes.belongsToMany(db.PurchasePrices, { through: db.TaxPurchasePrices })

db.SellingPrices.belongsToMany(db.Taxes, { through: db.TaxSellingPrices })
db.Taxes.belongsToMany(db.SellingPrices, { through: db.TaxSellingPrices })




module.exports = db
