import { Component } from '@angular/core';
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

    nodes = [
        {
            id: '1',
            type: 'input',
            data: { label: 'An input node' },
            position: { x: 0, y: 50 },
            sourcePosition: 'right'
        },
        {
            id: '2',
            type: 'selectorNode',
            data: { color: '#ffffff', label: '' },
            position: { x: 300, y: 50 },
        },
        {
            id: '3',
            type: 'output',
            data: { label: 'Output A' },
            position: { x: 650, y: 25 },
            targetPosition: 'left',
        },
        {
            id: '4',
            type: 'output',
            data: { label: 'Output B' },
            position: { x: 650, y: 100 },
            targetPosition: 'left',
        },
    ]

    edges = [
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
            animated: true,
        },
    ]

    constructor(
    ) {

    }

    test(data) {
        console.log(data)
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
                targetPosition: 'left',
            }
        ];
    }
}
