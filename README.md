# ngx-xyflow

> **Status: Beta**
> This project is currently in beta. Features are being ported from upstream as needed. Breaking changes may occur before v1.0.0.

**ngx-xyflow** is a comprehensive Angular wrapper for the popular [React Flow (@xyflow/react)](https://reactflow.dev/) library. It allows you to build node-based applications using Angular's native templates and change detection, while leveraging the powerful rendering capabilities of React Flow.

## Features

### ✅ Supported
- **Core Component**: `<ngx-xyflow>` wrapper around `ReactFlow`.
- **Custom Nodes**: Create custom nodes using standard Angular Templates (`<ng-template>`).
- **Plugins/Controls**:
  - `<ngx-xyflow-background>`
  - `<ngx-xyflow-controls>`
  - `<ngx-xyflow-minimap>`
- **Node Features**:
  - `<ngx-xyflow-handle>`: Define custom handles.
  - `<ngx-xyflow-node-resizer>`: Resize custom nodes.
  - `<ngx-xyflow-node-toolbar>`: Toolbars attached to nodes.
- **Events**: Full mapping of React Flow events to Angular Outputs (e.g., `(onNodeClick)`, `(onConnect)`).

### ❌ Not Yet Implemented / TODO
- **Custom Edges**: Custom edge templates are not yet supported.
- **Panel Component**: The `<Panel>` component is not yet wrapped.
- **Edge Label Renderer**: Support for rendering controls inside edges.
- **Viewport Portal**: Portals for rendering content outside the viewport.

## Quickstart

### Installation

```bash
npm install ngx-xyflow
```

*Note: `@xyflow/react` and `react` are installed as dependencies of this package.*

### Basic Usage

Import `XYFlowModule` (or `XYFlowComponent` directly if using standalone components).

```typescript
import { Component } from '@angular/core';
import { XYFlowModule } from 'ngx-xyflow';
import { addEdge, Connection } from '@xyflow/react'; // Import utilities from upstream

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [XYFlowModule],
  template: `
    <div style="height: 100vh; width: 100%;">
      <ngx-xyflow
        [nodes]="nodes"
        [edges]="edges"
        (onConnect)="onConnect($event)"
      >
        <ngx-xyflow-background />
        <ngx-xyflow-controls />
        <ngx-xyflow-minimap />
      </ngx-xyflow>
    </div>
  `
})
export class AppComponent {
  nodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  edges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];

  onConnect(connection: Connection) {
    this.edges = addEdge(connection, this.edges);
  }
}
```

## Custom Nodes

You can create custom nodes using standard Angular `<ng-template>`. Define the `nodeType` on `<ngx-xyflow-node>` to match the `type` in your node data.

```html
<ngx-xyflow [nodes]="nodes">
    <!-- Register a component for nodes with type="custom" -->
    <ngx-xyflow-node nodeType="custom">
        <ng-template let-data>
            <div class="custom-node-styles">
                <strong>{{ data.label }}</strong>
                
                <!-- Use handles inside your custom node -->
                <ngx-xyflow-handle type="source" position="right" />
                <ngx-xyflow-handle type="target" position="left" />
            </div>
        </ng-template>
    </ngx-xyflow-node>
</ngx-xyflow>
```

## API Reference

This library merely wraps the Props and Events of React Flow. For a detailed list of available inputs (`[nodes]`, `[edges]`, `[fitView]`, etc.) and event payloads, please refer to the official documentation:

👉 **[React Flow API Reference](https://reactflow.dev/api-reference)**

### Inputs
Angular Inputs map 1:1 to React Flow props.
- `[nodes]`: `Node[]`
- `[edges]`: `Edge[]`
- `[connectionMode]`: `ConnectionMode`
- ...and so on.

### Outputs
Angular Outputs map to React Flow event callbacks.
- `(onNodeClick)` -> `onNodeClick`
- `(onConnect)` -> `onConnect`
- `(onMove)` -> `onMove`
