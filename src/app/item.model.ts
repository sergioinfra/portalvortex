export enum VocacaoEnum {
  Knight = 1,
  Paladin,
  Druid,
  Sorcerer,
  Monk
}

export enum ProtecaoEnum {
  Physical,
  LifeDrain,
  ManaDrain,
  Fire,
  Earth,
  Energy,
  Ice,
  Holy,
  Death
}

export enum ImbuimentProtecaoEnum {
  Fire,
  Earth,
  Energy,
  Ice,
  Holy,
  Death
}

export enum SlotEnum {
  Hand,
  Helmet,
  Armor,
  Legs,
  Boots,
  ShieldOrSpellbookOrQuiver,
  Amulet,
  Ring,
  ExtraSlot
}

export class Protecao {
  constructor(
    public protecao: ProtecaoEnum,
    public percentual: number) {
  }

  protecaoText(): string {
    switch (this.protecao) {
      case ProtecaoEnum.Physical: return "Physical";
      case ProtecaoEnum.LifeDrain: return "Life Drain";
      case ProtecaoEnum.ManaDrain: return "Mana Drain";
      case ProtecaoEnum.Fire: return "Fire";
      case ProtecaoEnum.Earth: return "Earth";
      case ProtecaoEnum.Energy: return "Energy";
      case ProtecaoEnum.Ice: return "Ice";
      case ProtecaoEnum.Holy: return "Holy";
      case ProtecaoEnum.Death: return "Death";
      default: return "";
    }
  }

  protecaoTextCompleto(): string {
    if (this.percentual > 0)
      return `${this.protecaoText()} +${this.percentual}%`;
    else if (this.percentual < 0)
      return `${this.protecaoText()} ${this.percentual}%`;
    return '';
  }
}

export class Item {
  constructor(
    public id: number,
    public descricao: string,
    public url: string,
    public vocacao: VocacaoEnum[],
    public slot: SlotEnum,
    public pontos: number,
    public selecionado: boolean,
    public protecoes: Protecao[],
    public imbuimentSlot: number,
    public imbuiments?: ImbuimentProtecaoEnum[]) {
  }

  static allImbuiments(except?: ImbuimentProtecaoEnum): ImbuimentProtecaoEnum[] {
    if (except) {
      return [
        ImbuimentProtecaoEnum.Fire,
        ImbuimentProtecaoEnum.Earth,
        ImbuimentProtecaoEnum.Energy,
        ImbuimentProtecaoEnum.Ice,
        ImbuimentProtecaoEnum.Holy,
        ImbuimentProtecaoEnum.Death,
      ].filter(x => x !== except)
    }
    return [
      ImbuimentProtecaoEnum.Fire,
      ImbuimentProtecaoEnum.Earth,
      ImbuimentProtecaoEnum.Energy,
      ImbuimentProtecaoEnum.Ice,
      ImbuimentProtecaoEnum.Holy,
      ImbuimentProtecaoEnum.Death,
    ]
  }
}