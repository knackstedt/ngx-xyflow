import { ApplicationRef, NgZone } from '@angular/core';
import * as ngCore from '@angular/core';
import * as React from 'react';
import { NodeDirective } from './node.directive';
import { XYFlowComponent } from './xyflow.component';

describe('NodeDirective', () => {
    it('should be defined', () => {
        expect(NodeDirective).toBeDefined();
    });

    it('should register a template node wrapper when nodeType is provided', () => {
        const xyflow = {
            templateNodeTypes: {},
            ngOnChanges: () => undefined,
            _render: jasmine.createSpy('_render')
        } as unknown as XYFlowComponent;

        const appRef = {
            injector: {},
            attachView: jasmine.createSpy('attachView')
        } as unknown as ApplicationRef;

        const directive = new NodeDirective(
            xyflow,
            appRef,
            {} as any,
            {} as NgZone
        );

        directive.nodeType = 'switch-node';
        directive.template = {} as any;

        directive.ngAfterViewInit();

        expect((xyflow as any).templateNodeTypes['switch-node']).toBeDefined();
        expect((xyflow as any)._render).toHaveBeenCalled();
    });

    it('should pass full node props into the Angular node component', () => {
        const xyflow = {
            templateNodeTypes: {},
            ngOnChanges: () => undefined,
            _render: jasmine.createSpy('_render')
        } as unknown as XYFlowComponent;

        const appRef = {
            injector: {},
            attachView: jasmine.createSpy('attachView')
        } as unknown as ApplicationRef;

        const directive = new NodeDirective(
            xyflow,
            appRef,
            {} as any,
            {} as NgZone
        );

        directive.nodeType = 'switch-node';
        directive.template = {} as any;

        const componentRef = {
            setInput: jasmine.createSpy('setInput'),
            hostView: {},
            changeDetectorRef: {
                detectChanges: jasmine.createSpy('detectChanges')
            },
            destroy: jasmine.createSpy('destroy')
        } as any;

        const createComponentSpy = spyOn(ngCore, 'createComponent').and.returnValue(componentRef);

        spyOn(React, 'memo').and.callFake((factory: any) => factory);

        const firstRef = { current: {} };
        const secondRef = { current: null };
        let refCalls = 0;

        spyOn(React, 'useRef').and.callFake(() => {
            refCalls += 1;
            return refCalls === 1 ? firstRef : secondRef;
        });

        spyOn(React, 'useEffect').and.callFake((effect: any) => {
            effect();
        });

        directive.ngAfterViewInit();

        const wrapper = (xyflow as any).templateNodeTypes['switch-node'];
        const nodeProps = {
            id: 'n-1',
            type: 'switch-node',
            data: { label: 'Switch', routeCount: 3 },
            position: { x: 10, y: 20 }
        };

        wrapper(nodeProps);

        expect(createComponentSpy).toHaveBeenCalled();
        expect(componentRef.setInput).toHaveBeenCalledWith('template', directive.template);
        expect(componentRef.setInput).toHaveBeenCalledWith('data', nodeProps.data);
        expect(componentRef.setInput).toHaveBeenCalledWith('node', nodeProps);
    });
});
