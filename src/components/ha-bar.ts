import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import {
  getValueInPercentage,
  normalize,
  roundWithOneDecimal,
} from "../util/calculate";

@customElement("ha-bar")
export class HaBar extends LitElement {
  @property({ type: Number }) public min = 0;

  @property({ type: Number }) public max = 100;

  @property({ type: Number }) public value!: number;

  @property({ type: String }) public title_label!: string;

  protected render(): TemplateResult {
    const valuePercentage = roundWithOneDecimal(
      getValueInPercentage(
        normalize(this.value, this.min, this.max),
        this.min,
        this.max
      )
    );

    return html`
      <div
        role="meter"
        aria-valuenow="${valuePercentage}%"
        aria-label=${this.title_label}
      >
        <svg>
          <g>
            <rect />
            <rect width="${valuePercentage}%" />
          </g>
        </svg>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      rect {
        height: 100%;
      }
      rect:first-child {
        width: 100%;
        fill: var(--ha-bar-background-color, var(--secondary-background-color));
      }
      rect:last-child {
        fill: var(--ha-bar-primary-color, var(--primary-color));
      }
      svg {
        border-radius: var(--ha-bar-border-radius, 4px);
        height: 12px;
        width: 100%;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-bar": HaBar;
  }
}
