# EPN Design System

## Paleta de Colores Institucionales

| Color       | HEX     | Significado |
|-------------|---------|-------------|
| Azul oscuro | #1A2F6E | Ciencia     |
| Rojo        | #C41E3A | Triunfo     |
| Dorado      | #C9A84C | Nobleza     |

## Variables CSS

```css
:root {
  --epn-azul-oscuro: #1A2F6E;
  --epn-rojo: #C41E3A;
  --epn-dorado: #C9A84C;
  --epn-azul-claro: #2A4B9E;
  --epn-rojo-claro: #E04A5E;
  --epn-dorado-claro: #DDBE6E;
  --epn-blanco: #FFFFFF;
  --epn-gris-claro: #F4F4F6;
  --epn-gris: #6B7280;
  --epn-gris-oscuro: #374151;
  --epn-negro: #111827;
  --epn-exito: #10B981;
  --epn-error: #EF4444;
  --epn-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --epn-border-radius: 6px;
  --epn-transition: 0.2s ease-in-out;
}
```

## Header

```css
.epn-header {
  background: linear-gradient(135deg, var(--epn-azul-oscuro), var(--epn-azul-claro));
  color: var(--epn-blanco);
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(26, 47, 110, 0.3);
  border-bottom: 3px solid var(--epn-dorado);
}

.epn-header h1 {
  font-family: var(--epn-font-family);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
}

.epn-header__logo {
  height: 48px;
  width: auto;
}
```

## Layout en Grid de 2 Columnas

```css
.epn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.epn-grid__full {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .epn-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }
}
```

## Formulario

```css
.epn-form {
  background: var(--epn-blanco);
  border: 1px solid var(--epn-gris-claro);
  border-radius: var(--epn-border-radius);
  padding: 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.epn-form__group {
  margin-bottom: 1.25rem;
}

.epn-form__label {
  display: block;
  font-family: var(--epn-font-family);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--epn-gris-oscuro);
  margin-bottom: 0.375rem;
}
```

## Inputs

```css
.epn-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-family: var(--epn-font-family);
  font-size: 0.9375rem;
  color: var(--epn-negro);
  background: var(--epn-blanco);
  border: 1.5px solid #D1D5DB;
  border-radius: var(--epn-border-radius);
  transition: border-color var(--epn-transition), box-shadow var(--epn-transition);
  box-sizing: border-box;
}

.epn-input:focus {
  outline: none;
  border-color: var(--epn-azul-oscuro);
  box-shadow: 0 0 0 3px rgba(26, 47, 110, 0.15);
}

.epn-input--error {
  border-color: var(--epn-rojo);
}

.epn-input--error:focus {
  box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.15);
}
```

## Botón Principal

```css
.epn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.5rem;
  font-family: var(--epn-font-family);
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  border-radius: var(--epn-border-radius);
  cursor: pointer;
  transition: background var(--epn-transition), transform var(--epn-transition);
}

.epn-btn--primary {
  background: var(--epn-azul-oscuro);
  color: var(--epn-blanco);
}

.epn-btn--primary:hover {
  background: var(--epn-azul-claro);
  transform: translateY(-1px);
}

.epn-btn--primary:active {
  transform: translateY(0);
}

.epn-btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

## Mensajes de Éxito y Error

```css
.epn-message {
  padding: 0.875rem 1.125rem;
  border-radius: var(--epn-border-radius);
  font-family: var(--epn-font-family);
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.epn-message--success {
  background: #ECFDF5;
  color: #065F46;
  border: 1px solid #A7F3D0;
  border-left: 4px solid var(--epn-exito);
}

.epn-message--error {
  background: #FEF2F2;
  color: #991B1B;
  border: 1px solid #FECACA;
  border-left: 4px solid var(--epn-error);
}
```
