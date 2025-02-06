import { Directive, ElementRef, Host, HostListener, Input } from '@angular/core';
import { of } from 'rxjs';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {


  @Input('appTooltip') tooltipTitle?: string; //Text being displayed in the tooltip
  @Input() placement?: string; //Placement of the tooltip AVAILABLE OPTIONS: left, right
  @Input() delay?: number; //Delay in milliseconds
  tooltip?: HTMLElement;
  offset = 2.5; //Distance from the parent element

  constructor( private el:ElementRef) {

   }

   //This function listens for the mouseenter event
   @HostListener('mouseenter') onMouseEnter() {
    if(!this.tooltip) { 
      this.showTooltip(); 
    }
   }
   
   //This function listens for the mouseleave event
   @HostListener('mouseleave') onMouseLeave() {
    if(this.tooltip) {
       this.hideTooltip(); 
      }
   }

   //This function creates the tooltip and sets the position
    showTooltip() {
      this.createTooltip();
      this.setPosition();
      this.tooltip?.classList.add('ng-tooltip-show');
    }

    //This function creates the tooltip element
    createTooltip() {
      this.tooltip = document.createElement('span');

      this.tooltip.classList.add('ng-tooltip');

      this.tooltip.innerHTML = this.tooltipTitle || '';

      document.body.appendChild(this.tooltip);
    }

    //This function sets the position of the tooltip
    setPosition() {
      const elemRect = this.el.nativeElement.getBoundingClientRect();
      const tooltipRect = this.tooltip?.getBoundingClientRect();

      if (!tooltipRect) {
        return;
      }
      let left, top;

      //Set the position of the tooltip based on the placement, if you want to add more placements, add them here
      switch (this.placement) {
        case 'left':
          left = elemRect.left - tooltipRect.width - this.offset;
          top = elemRect.top + (elemRect.height +tooltipRect.height) / 2;
          break;
        case 'right':
          left = elemRect.right + this.offset;
          top = elemRect.top + (elemRect.height + tooltipRect.height) / 2;
          break;
        default:
          throw new Error('No availlable placement specified');
      }

      //Assign the position to the tooltip
      if(this.tooltip){
        this.tooltip.style.left = left + 'px';
        this.tooltip.style.top = top + 'px';
      }
    }
  
    //This function hides the tooltip
    hideTooltip() {
      this.tooltip?.classList.remove('ng-tooltip-show');
      this.tooltip?.remove();
      this.tooltip=undefined;
    }
}
