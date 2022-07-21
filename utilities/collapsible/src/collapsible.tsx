// reusable-ui:
import type {
    // hooks:
    EventHandler,
}                           from '@reusable-ui/hooks'           // react helper hooks



// react components:
export interface OpenChangeEvent {
    open: boolean
}
export interface Collapsible<TOpenChangeEvent extends OpenChangeEvent = OpenChangeEvent> {
    open         ?: boolean
    onOpenChange ?: EventHandler<TOpenChangeEvent>
}
