#nullable disable

using Domain.Common;

namespace Domain.Entities
{
    internal class HelcimPayBody : BaseAuditableEntity
    {
        // Payment Type. Valid payment types are : 
        // purchase | preauth | verify
        public string PaymentType { get; set; }
        // The amount of the transaction to be processed
        public int Amount { get; set; }
        // Currency abbreviation.
        // CAD | USD
        public string Currency { get; set; }
        // This is the code of an existing customer in Helcim associated with this checkout
        public string? CustomerCode { get; set; }
        // This is the number of an existing invoice in Helcim associated with this checkout
        public string? InvoiceNumber { get; set; }
        // This is the payment method (credit card, ACH) that customer can use to pay the amount:
        // cc | ach | cc-ach
        public string? PaymentMethod { get; set; }
        // This is used to determine whether the partial payment UI will be displayed to the customer
        public int? AllowPartial { get; set; }
        // This is used to apply the convenience fee rate to credit card transaction should customer chooses this payment method
        public int? HasConvenienceFee { get; set; }
        // This is used to enable level 2 processing lower rates. The value should be the dollar amount of the tax to 2 decimal places.
        public int? TaxAmount { get; set; }

    }
}
