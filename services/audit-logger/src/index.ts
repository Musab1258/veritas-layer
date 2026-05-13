import type {
  AuditEvent,
  EventCategory,
  EventStatus,
  MvpRuntimeState,
} from '../../../packages/shared-types/src/index';

interface CreateAuditEventInput {
  category: EventCategory;
  action: string;
  actor: string;
  status: EventStatus;
  message: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export function appendAuditEvent(
  state: MvpRuntimeState,
  input: CreateAuditEventInput,
) {
  const event: AuditEvent = {
    id: `evt_${state.auditLog.length + 1}`,
    category: input.category,
    action: input.action,
    actor: input.actor,
    status: input.status,
    message: input.message,
    timestamp: Date.now(),
    metadata: input.metadata ?? {},
  };

  state.auditLog.unshift(event);

  return event;
}
