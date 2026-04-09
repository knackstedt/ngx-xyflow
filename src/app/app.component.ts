import { Component, ViewChild } from '@angular/core';
import { addEdge, Connection, Edge, Node, Position, XYFlowComponent } from '../xyflow/public-api';
import { XYFlowModule } from '../xyflow/xyflow.module';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        XYFlowModule
    ]
})
export class AppComponent {
    @ViewChild('mainFlow') mainFlow!: XYFlowComponent;
    @ViewChild('secondaryFlow') secondaryFlow?: XYFlowComponent;

    // Main flow data
    nodes: Node[] = [
        {
            id: '1',
            type: 'input',
            data: { label: 'An input node' },
            position: { x: 0, y: 50 },
            sourcePosition: Position.Right
        },
        {
            id: '2',
            type: 'selectorNode',
            data: { color: '#ffffff', label: 'Selector' },
            position: { x: 300, y: 50 },
        },
        {
            id: '3',
            type: 'output',
            data: { label: 'Output A' },
            position: { x: 650, y: 25 },
            targetPosition: Position.Left,
        },
        {
            id: '4',
            type: 'output',
            data: { label: 'Output B' },
            position: { x: 650, y: 150 },
            targetPosition: Position.Left,
        },
    ]

    edges: Edge[] = [
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
        },
        {
            id: 'e2a-3',
            source: '2',
            target: '3',
            sourceHandle: 'a',
            animated: true,
        },
        {
            id: 'e2b-4',
            source: '2',
            target: '4',
            sourceHandle: 'b',
            type: 'customEdge', // Using custom edge type
            animated: true,
        },
    ]

    // Secondary flow for multi-flow demo
    secondaryNodes: Node[] = [
        { id: 's1', type: 'default', data: { label: 'Secondary 1' }, position: { x: 0, y: 0 } },
        { id: 's2', type: 'default', data: { label: 'Secondary 2' }, position: { x: 200, y: 0 } },
    ]
    secondaryEdges: Edge[] = [
        { id: 'se1-2', source: 's1', target: 's2', animated: true }
    ]

    // Configuration
    colorMode: 'light' | 'dark' | 'system' = 'light';
    showSecondaryFlow = false;

    get backgroundVariant() {
        return this.colorMode === 'dark' ? 'dots' : 'lines' as const;
    }

    constructor() {}

    test(data: any) {
        console.log('Event:', data)
    }

    addNode() {
        const nodeCount = this.nodes.length;
        const id = (nodeCount + 1).toString();

        this.nodes = [
            ...this.nodes,
            {
                id: id,
                type: 'output',
                data: { label: `New node ${id}` },
                position: { x: 650 , y: (nodeCount * 100) },
                targetPosition: Position.Left,
            } as Node
        ];

        // Use service to fit view after adding
        setTimeout(() => this.mainFlow?.flow.fitView({ padding: 0.2 }), 100);
    }

    // Programmatic control methods
    zoomIn() {
        this.mainFlow?.flow.zoomIn({ duration: 300 });
    }

    zoomOut() {
        this.mainFlow?.flow.zoomOut({ duration: 300 });
    }

    fitView() {
        this.mainFlow?.flow.fitView({ padding: 0.2 });
    }

    setCenter() {
        this.mainFlow?.flow.setCenter(400, 200, { zoom: 1.5, duration: 500 });
    }

    toggleColorMode() {
        this.colorMode = this.colorMode === 'light' ? 'dark' : 'light';
    }

    toggleSecondaryFlow() {
        this.showSecondaryFlow = !this.showSecondaryFlow;
    }

    onConnect(connection: Connection) {
        console.log('New connection:', connection);
        this.edges = addEdge(connection, this.edges);
    }

    isValidConnection(connection: Connection): boolean {
        // Demo: Only allow connections to different targets
        const existing = this.edges.find(e => e.target === connection.target && e.source === connection.source);
        if (existing) {
            console.log('Connection already exists!');
            return false;
        }
        return true;
    }

    onViewportChange(viewport: { x: number; y: number; zoom: number }) {
        console.log('Viewport changed:', viewport);
    }

    deleteEdge(id: string) {
        this.edges = this.edges.filter(e => e.id !== id);
    }

    onHandleConnect(connection: Connection) {
        console.log('Handle connected:', connection);
    }
}
