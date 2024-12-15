# ngx-xyflow

> This project is currently in a beta phase and features will be added upon pull requests.
I will try to minimize breaking changes between minor version revisions but some may be made until we reach 1.0.0.

This project is a proper Angular wrapper of the React version of xyflow.

## Quickstart
### Install the Package
```bash
npm install ngx-xyflow
```

### Import the module into your component
```ts
import { Component } from '@angular/core';
import { XYFlowModule } from 'ngx-xyflow';

@Component({
    selector: 'app-test',
    template: '<ngx-xyflow [nodes]="nodes" [edges]="edges"/>',
    imports: [
        XYFlowModule
    ],
    standalone: true
})
export class TestComponent {
    nodes = [];
    edges = [];
}

```

## Examples

### Basic Configuration

```html
<ngx-xyflow
    [nodes]="nodes"
    [edges]="edges"
>
    <!-- The background is configurable in the same manner as the original React component. -->
    <ngx-xyflow-background
        color="pink"
        [gap]="20"
        [size]="2"
    />

    <!-- Controls can also be configured, and events will fire normally. -->
    <ngx-xyflow-controls
        (onFitView)="log('onFitView')"
        (onInteractiveChange)="log('onInteractiveChange ' + $event)"
        (onZoomIn)="log('onZoomIn')"
        (onZoomOut)="log('onZoomOut')"
    />

    <!-- Add the minimap. -->
    <ngx-xyflow-minimap
        (onClick)="log('onMinimapClick')"
        (onNodeClick)="log('onMinimapNodeClick')"
    />
</ngx-xyflow>
```


### Custom Nodes

```html
<ngx-xyflow
    [nodes]="nodes"
    [edges]="edges"
>
    <!-- Here, nodeType refers to the `type` property on an individual node's JSON. -->
    <ngx-xyflow-node
        nodeType="selectorNode"
    >
        <!-- The default template is used as this reduces DOM cluttering. -->
        <ng-template let-data>
            <div class="custom_node">
                {{data.label}}
            </div>
        </ng-template>

        <!-- You can also define the handles here -->
        <ngx-xyflow-handle
            type="target"
            position="left"
            [isConnectable]="true"
        />

        <ngx-xyflow-handle
            type="source"
            position="right"
            id="b"
        />
    </ngx-xyflow-node>
</ngx-xyflow>
```

