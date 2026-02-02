-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vendorId" TEXT,
    "riderId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "pickupTime" TIMESTAMP(3) NOT NULL,
    "deliveryTime" TIMESTAMP(3) NOT NULL,
    "serviceType" TEXT NOT NULL DEFAULT 'Standard',
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "gstNumber" TEXT,
    "hasIssue" BOOLEAN NOT NULL DEFAULT false,
    "issueType" TEXT,
    "issueNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "condition" TEXT,
    "riderVerified" BOOLEAN NOT NULL DEFAULT false,
    "vendorVerified" BOOLEAN NOT NULL DEFAULT false,
    "discrepancy" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderImage" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "OrderImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderImage" ADD CONSTRAINT "OrderImage_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
