export enum AddressTypeEnum {
  PICKING = "picking",
  DELIVERING = "delivering",
}

export enum StuartWebhookEvent {
  JOB = "job",
  DELIVERY = "delivery",
  DRIVER = "driver",
}

export enum StuartWebhookType {
  CREATE = "create",
  UPDATE = "update",
  ONLINE = "online",
  OFFLINE = "offline",
}

export enum StuartJobStatus {
  NEW = "new",
  SCHEDULED = "scheduled",
  SEARCHING = "searching",
  IN_PROGRESS = "in_progress",
  FINISHED = "finished",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
  VOIDED = "voided",
}

export enum StuartDeliveryStatus {
  PENDING = "pending",
  PICKING = "picking",
  ALMOST_PICKING = "almost_picking",
  WATING_AT_PICKUP = "waiting_at_pickup",
  DRIVERING = "delivering",
  ALMOST_DRIVERING = "almost_delivering",
  WAITING_AT_DROPOFF = "waiting_at_dropoff",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  ON_DUTY = "on_duty",
}
