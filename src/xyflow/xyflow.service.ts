import { Injectable } from '@angular/core';
import type { Edge, Node, ReactFlowInstance, Viewport } from '@xyflow/react';

/**
 * Service to access ReactFlow instance methods.
 * Inject this service to programmatically control the flow.
 */
@Injectable()
export class XYFlowService {
    private _instance: ReactFlowInstance | null = null;

    setInstance(instance: ReactFlowInstance) {
        this._instance = instance;
    }

    get instance(): ReactFlowInstance | null {
        return this._instance;
    }

    /** Get the current viewport */
    getViewport(): Viewport | null {
        return this._instance?.getViewport() ?? null;
    }

    /** Set the viewport */
    setViewport(viewport: Viewport, options?: { duration?: number }): void {
        this._instance?.setViewport(viewport, options);
    }

    /** Zoom to a specific level */
    zoomTo(level: number, options?: { duration?: number }): void {
        this._instance?.zoomTo(level, options);
    }

    /** Zoom in */
    zoomIn(options?: { duration?: number }): void {
        this._instance?.zoomIn(options);
    }

    /** Zoom out */
    zoomOut(options?: { duration?: number }): void {
        this._instance?.zoomOut(options);
    }

    /** Fit the view to show all nodes */
    fitView(options?: {
        padding?: number;
        includeHiddenNodes?: boolean;
        minZoom?: number;
        maxZoom?: number;
        duration?: number;
        nodes?: (Node | { id: string })[];
    }): void {
        this._instance?.fitView(options);
    }

    /** Set the center of the viewport */
    setCenter(x: number, y: number, options?: { zoom?: number; duration?: number }): void {
        this._instance?.setCenter(x, y, options);
    }

    /** Fit bounds */
    fitBounds(
        bounds: { x: number; y: number; width: number; height: number },
        options?: { padding?: number; duration?: number }
    ): void {
        this._instance?.fitBounds(bounds, options);
    }

    /** Project a screen position to flow coordinates */
    screenToFlowPosition(position: { x: number; y: number }): { x: number; y: number } | null {
        return this._instance?.screenToFlowPosition(position) ?? null;
    }

    /** Convert flow position to screen coordinates */
    flowToScreenPosition(position: { x: number; y: number }): { x: number; y: number } | null {
        return this._instance?.flowToScreenPosition(position) ?? null;
    }

    /** Get a node by id */
    getNode(id: string): Node | null {
        return this._instance?.getNode(id) ?? null;
    }

    /** Get an edge by id */
    getEdge(id: string): Edge | null {
        return this._instance?.getEdge(id) ?? null;
    }

    /** Add nodes */
    addNodes(nodes: Node[]): void {
        this._instance?.addNodes(nodes);
    }

    /** Add edges */
    addEdges(edges: Edge[]): void {
        this._instance?.addEdges(edges);
    }

    /** Delete elements */
    deleteElements(options: { nodes?: { id: string }[]; edges?: { id: string }[] }): void {
        this._instance?.deleteElements(options);
    }

    /** Get all nodes */
    getNodes(): Node[] {
        return this._instance?.getNodes() ?? [];
    }

    /** Get all edges */
    getEdges(): Edge[] {
        return this._instance?.getEdges() ?? [];
    }

    /** Update a node */
    updateNode(id: string, data: Partial<Node> | ((node: Node) => Partial<Node>)): void {
        this._instance?.updateNode(id, data);
    }

    /** Update an edge */
    updateEdge(id: string, data: Partial<Edge> | ((edge: Edge) => Partial<Edge>)): void {
        this._instance?.updateEdge(id, data);
    }

    /** Get intersecting nodes */
    getIntersectingNodes(node: Node | { id: string; x: number; y: number; width: number; height: number }, partially?: boolean): Node[] {
        return this._instance?.getIntersectingNodes(node, partially) ?? [];
    }

    /** Check if a node is intersecting with a given rect */
    isNodeIntersecting(node: Node | { id: string }, area: { x: number; y: number; width: number; height: number }, partially?: boolean): boolean {
        return this._instance?.isNodeIntersecting(node, area, partially) ?? false;
    }

    /** Export flow to JSON */
    toObject(): { nodes: Node[]; edges: Edge[]; viewport: Viewport } | null {
        return this._instance?.toObject() ?? null;
    }
}
