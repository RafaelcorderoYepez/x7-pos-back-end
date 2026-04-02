import { OrderItem } from '../order-item/entities/order-item.entity';
import { OrderItemStatus } from '../order-item/constants/order-item-status.enum';
import { KitchenStatus } from './constants/kitchen-status.enum';

export function roundMoney(value: number): number {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

export function lineSubtotal(item: Pick<OrderItem, 'quantity' | 'price' | 'discount'>): number {
  const qty = Number(item.quantity);
  const price = Number(item.price);
  const disc = Number(item.discount ?? 0);
  return roundMoney(qty * price - disc);
}

export function computeSubtotalFromItems(items: OrderItem[]): number {
  const active = items.filter((i) => i.status === OrderItemStatus.ACTIVE);
  if (active.length === 0) return 0;
  return roundMoney(active.reduce((sum, i) => sum + lineSubtotal(i), 0));
}

export function computeOrderTotal(
  subtotal: number,
  discountTotal: number,
  taxTotal: number,
  tipTotal: number,
  deliveryFee: number,
): number {
  return roundMoney(
    roundMoney(subtotal) -
      roundMoney(discountTotal) +
      roundMoney(taxTotal) +
      roundMoney(tipTotal) +
      roundMoney(deliveryFee),
  );
}

export function deriveKitchenStatusFromItems(
  items: Pick<OrderItem, 'status' | 'kitchen_status'>[],
): KitchenStatus {
  const active = items.filter((i) => i.status === OrderItemStatus.ACTIVE);
  if (active.length === 0) return KitchenStatus.PENDING;

  if (active.every((i) => i.kitchen_status === KitchenStatus.CANCELLED)) {
    return KitchenStatus.CANCELLED;
  }
  const nonCancelled = active.filter(
    (i) => i.kitchen_status !== KitchenStatus.CANCELLED,
  );
  if (nonCancelled.length === 0) return KitchenStatus.CANCELLED;

  if (nonCancelled.every((i) => i.kitchen_status === KitchenStatus.COMPLETED)) {
    return KitchenStatus.COMPLETED;
  }
  if (nonCancelled.every((i) => i.kitchen_status === KitchenStatus.READY)) {
    return KitchenStatus.READY;
  }
  if (nonCancelled.some((i) => i.kitchen_status === KitchenStatus.PREPARING)) {
    return KitchenStatus.PREPARING;
  }
  if (nonCancelled.some((i) => i.kitchen_status === KitchenStatus.SENT)) {
    return KitchenStatus.SENT;
  }
  if (nonCancelled.every((i) => i.kitchen_status === KitchenStatus.PENDING)) {
    return KitchenStatus.PENDING;
  }
  return KitchenStatus.SENT;
}

export function applyPaidDerivedFields(order: {
  total: number;
  paid_total: number;
  balance_due: number;
  is_paid: boolean;
}): void {
  order.balance_due = roundMoney(roundMoney(order.total) - roundMoney(order.paid_total));
  order.is_paid = order.balance_due === 0;
}
