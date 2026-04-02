import {
  applyPaidDerivedFields,
  computeOrderTotal,
  computeSubtotalFromItems,
  deriveKitchenStatusFromItems,
} from './order-aggregation.util';
import { OrderItemStatus } from '../order-item/constants/order-item-status.enum';
import { KitchenStatus } from './constants/kitchen-status.enum';

describe('order-aggregation.util', () => {
  describe('computeOrderTotal', () => {
    it('should apply total formula correctly', () => {
      const subtotal = 100;
      const discountTotal = 10;
      const taxTotal = 8;
      const tipTotal = 5;
      const deliveryFee = 7;

      const total = computeOrderTotal(
        subtotal,
        discountTotal,
        taxTotal,
        tipTotal,
        deliveryFee,
      );

      expect(total).toBe(110); // 100 - 10 + 8 + 5 + 7
    });
  });

  describe('computeSubtotalFromItems', () => {
    it('should calculate subtotal from active items only', () => {
      const subtotal = computeSubtotalFromItems([
        {
          quantity: 2,
          price: 15,
          discount: 5,
          status: OrderItemStatus.ACTIVE,
        } as any,
        {
          quantity: 1,
          price: 10,
          discount: 0,
          status: OrderItemStatus.ACTIVE,
        } as any,
        {
          quantity: 10,
          price: 100,
          discount: 0,
          status: OrderItemStatus.DELETED,
        } as any,
      ]);

      expect(subtotal).toBe(35); // (2*15-5) + (1*10)
    });
  });

  describe('applyPaidDerivedFields', () => {
    it('should mark is_paid=true when balance_due is exactly 0', () => {
      const order = {
        total: 50,
        paid_total: 50,
        balance_due: 0,
        is_paid: false,
      };

      applyPaidDerivedFields(order);

      expect(order.balance_due).toBe(0);
      expect(order.is_paid).toBe(true);
    });

    it('should mark is_paid=false when balance_due is greater than 0', () => {
      const order = {
        total: 50,
        paid_total: 20,
        balance_due: 0,
        is_paid: true,
      };

      applyPaidDerivedFields(order);

      expect(order.balance_due).toBe(30);
      expect(order.is_paid).toBe(false);
    });
  });

  describe('deriveKitchenStatusFromItems', () => {
    it('should return PENDING if all active items are pending', () => {
      const status = deriveKitchenStatusFromItems([
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.PENDING,
        } as any,
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.PENDING,
        } as any,
      ]);
      expect(status).toBe(KitchenStatus.PENDING);
    });

    it('should return SENT if some items are sent', () => {
      const status = deriveKitchenStatusFromItems([
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.PENDING,
        } as any,
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.SENT,
        } as any,
      ]);
      expect(status).toBe(KitchenStatus.SENT);
    });

    it('should return PREPARING when any item is preparing', () => {
      const status = deriveKitchenStatusFromItems([
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.SENT,
        } as any,
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.PREPARING,
        } as any,
      ]);
      expect(status).toBe(KitchenStatus.PREPARING);
    });

    it('should return READY when all non-cancelled active items are ready', () => {
      const status = deriveKitchenStatusFromItems([
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.READY,
        } as any,
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.READY,
        } as any,
      ]);
      expect(status).toBe(KitchenStatus.READY);
    });

    it('should return COMPLETED when all non-cancelled active items are completed', () => {
      const status = deriveKitchenStatusFromItems([
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.COMPLETED,
        } as any,
        {
          status: OrderItemStatus.ACTIVE,
          kitchen_status: KitchenStatus.COMPLETED,
        } as any,
      ]);
      expect(status).toBe(KitchenStatus.COMPLETED);
    });
  });
});
