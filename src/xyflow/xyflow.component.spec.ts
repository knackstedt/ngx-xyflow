import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XYFlowComponent } from './xyflow.component';
import { XYFlowModule } from './xyflow.module';

describe('XYFlowComponent', () => {
    let component: XYFlowComponent;
    let fixture: ComponentFixture<XYFlowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [XYFlowModule]
        }).compileComponents();

        fixture = TestBed.createComponent(XYFlowComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with empty nodes and edges', () => {
        expect(component._nodes).toBeUndefined();
        expect(component._edges).toBeUndefined();
    });

    it('should have event emitters defined', () => {
        expect(component._nodesChange).toBeDefined();
        expect(component._edgesChange).toBeDefined();
        expect(component.onConnect).toBeDefined();
        expect(component.onNodeClick).toBeDefined();
    });

    it('should have nodeTypes and edgeTypes initialized', () => {
        expect(component.nodeTypes).toBeDefined();
        expect(component.edgeTypes).toBeDefined();
    });
});
