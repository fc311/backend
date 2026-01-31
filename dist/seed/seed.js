"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    const existingCount = await prisma.shipment.count();
    if (existingCount > 0) {
        console.log(`✅ Database already seeded (${existingCount} records)`);
        return;
    }
    console.log("🌱 Seeding shipments...");
    await prisma.shipment.createMany({
        data: [
            {
                shipperName: "Acme Manufacturing",
                carrierName: "BlueDart",
                pickupLocation: "Bengaluru",
                deliveryLocation: "Mumbai",
                trackingNumber: "BD-IND-100001",
                rate: 12500,
                status: "IN_TRANSIT",
            },
            {
                shipperName: "Globex Corporation",
                carrierName: "DHL",
                pickupLocation: "Delhi",
                deliveryLocation: "Chennai",
                trackingNumber: "DHL-IN-204992",
                rate: 18750,
                status: "DELIVERED",
            },
            {
                shipperName: "Wayne Logistics",
                carrierName: "FedEx",
                pickupLocation: "Hyderabad",
                deliveryLocation: "Pune",
                trackingNumber: "FDX-778231",
                rate: 9400,
                status: "PENDING_PICKUP",
            },
            {
                shipperName: "Stark Industries",
                carrierName: "Delhivery",
                pickupLocation: "Noida",
                deliveryLocation: "Jaipur",
                trackingNumber: "DLV-558901",
                rate: 6700,
                status: "IN_TRANSIT",
            },
            {
                shipperName: "Umbrella Supplies",
                carrierName: "Ecom Express",
                pickupLocation: "Kolkata",
                deliveryLocation: "Patna",
                trackingNumber: "ECOM-443210",
                rate: 5200,
                status: "DELIVERED",
            },
            {
                shipperName: "Initech",
                carrierName: "XpressBees",
                pickupLocation: "Indore",
                deliveryLocation: "Ahmedabad",
                trackingNumber: "XB-990871",
                rate: 8100,
                status: "IN_TRANSIT",
            },
            {
                shipperName: "Hooli",
                carrierName: "DTDC",
                pickupLocation: "Chandigarh",
                deliveryLocation: "Amritsar",
                trackingNumber: "DTDC-118877",
                rate: 4300,
                status: "DELIVERED",
            },
            {
                shipperName: "Soylent Corp",
                carrierName: "FedEx",
                pickupLocation: "Nagpur",
                deliveryLocation: "Bhopal",
                trackingNumber: "FDX-663981",
                rate: 7200,
                status: "IN_TRANSIT",
            },
            {
                shipperName: "Wonka Industries",
                carrierName: "BlueDart",
                pickupLocation: "Surat",
                deliveryLocation: "Vadodara",
                trackingNumber: "BD-IND-100992",
                rate: 3900,
                status: "DELIVERED",
            },
            {
                shipperName: "Tyrell Corporation",
                carrierName: "DHL",
                pickupLocation: "Gurugram",
                deliveryLocation: "Lucknow",
                trackingNumber: "DHL-IN-778345",
                rate: 15800,
                status: "IN_TRANSIT",
            },
            {
                shipperName: "Cyberdyne Systems",
                carrierName: "Delhivery",
                pickupLocation: "Pune",
                deliveryLocation: "Nashik",
                trackingNumber: "DLV-882910",
                rate: 4600,
                status: "PENDING_PICKUP",
            },
            {
                shipperName: "Aperture Science",
                carrierName: "XpressBees",
                pickupLocation: "Udaipur",
                deliveryLocation: "Jodhpur",
                trackingNumber: "XB-556712",
                rate: 5400,
                status: "DELIVERED",
            },
            {
                shipperName: "Massive Dynamic",
                carrierName: "Ecom Express",
                pickupLocation: "Ranchi",
                deliveryLocation: "Bhubaneswar",
                trackingNumber: "ECOM-990112",
                rate: 8800,
                status: "IN_TRANSIT",
            },
            {
                shipperName: "Oceanic Airlines",
                carrierName: "DTDC",
                pickupLocation: "Kochi",
                deliveryLocation: "Trivandrum",
                trackingNumber: "DTDC-774401",
                rate: 4100,
                status: "DELIVERED",
            },
            {
                shipperName: "Pied Piper",
                carrierName: "BlueDart",
                pickupLocation: "Sanand",
                deliveryLocation: "Rajkot",
                trackingNumber: "BD-IND-109231",
                rate: 6900,
                status: "IN_TRANSIT",
            },
        ],
    });
    console.log("🌱 Seeding complete: 15 shipments created");
}
seed()
    .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
