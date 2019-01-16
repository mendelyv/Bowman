/**
 * 游戏场景处理
 */
class GameView extends eui.Component {
    public joyL: Joystick;
    public joyR: Joystick;
    public player: Player;
    public uiGroup: eui.Group;
    private closeBtn: eui.Image;
    private skillComponents: eui.Group;
    private lvLabel: eui.Label;//玩家等级
    private expMask: eui.Rect;//玩家经验遮罩
    private expMaskWidth: number;//玩家经验遮罩的原始宽度
    public gameBg: GameBg;
    public gameEnd: GameEnd;//结束面板
    public rankGroup: eui.Group;//排行面板
    private previousFrameTime: number = 0;
    private shootTime: number = 0;
    private shootDelay: number = 1000;
    private _broadcast: Broadcast;//广播
    public mapMgr: MapManager;
    public enemyMgr: EnemyManager;
    public battleMgr: BattleManager;
    private _rankpanel: RankPanel;

    public constructor() {
        super();
        this.init();
    }
    /**初始化*/
    public init() {
        this.initObjectPool();
    }

    private initObjectPool() {
        let property = new Property();
        ObjectPool.instance.createObjectPool("property", property);
        let arrow = new Arrow();
        ObjectPool.instance.createObjectPool(arrow.poolName, arrow);
        let fireball = new FireBall();
        ObjectPool.instance.createObjectPool(fireball.poolName,fireball);
        let enemy = new Enemy();
        ObjectPool.instance.createObjectPool("enemy", enemy);
    }


    protected createChildren() {
        this.skinName = "GameViewSkin";
        this.initEvents();
        this.joyL.resetON = true;//打开左手手柄重置数据的开关
        // this.showDiff();
        this.gameBg.gameView = this;
        this.battleMgr = new BattleManager();
        this.battleMgr.player = this.player;
        this.battleMgr.roleArray.push(this.player);
        if (this.player.weaponType == WeaponType.ROTARY_DARTS) {
			this.player.attack();
		}
        if(this.player.weaponType == WeaponType.ROTARY_SHIELD){
            this.player.defend();
        }
        this.mapMgr = new MapManager();
        this.enemyMgr = new EnemyManager();
        this.gameEnd.visible = false;

        let pos = MapManager.getRandomEmptyPos();
        this.gameBg.x = StageUtils.WIN_WIDTH * 0.5 - pos.x;
        this.gameBg.y = StageUtils.WIN_HEIGHT * 0.5 - pos.y;
        this.initBroadcast();

        if (!this._rankpanel) {
            this._rankpanel = new RankPanel();
            this._rankpanel.x = 0;
            this._rankpanel.y = 0;
            this.rankGroup.addChild(this._rankpanel);
        }
        this.updateRankPanel();
        this.initExpPanel();
    }

    public initExpPanel() {
        this.expMaskWidth = this.expMask.width;
        this.expMask.width = 0;
    }

    /**刷新排行*/
    public updateRankPanel(): void {
        if (this.rankGroup) {
            this.rankGroup.removeChildren();
        }
        this._rankpanel = new RankPanel();
        this._rankpanel.x = 0;
        this._rankpanel.y = 0;
        this.rankGroup.addChild(this._rankpanel);

        this._rankpanel.updateView();
    }

    /**初始化广播 */
    private initBroadcast(): void {
        if (!this._broadcast) {
            this._broadcast = new Broadcast();
            this._broadcast.x = StageUtils.WIN_WIDTH * 0.5;
            this.uiGroup.addChild(this._broadcast);
        }
    }
    public addMsg(msg: string): void {
        if (this._broadcast) {
            this._broadcast.addMsg(msg);
        }
    }

    private initEvents(): void {
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToMain, Main.instance);
    }

    /**每帧循环处理 */
    private update(): void {
        let deltaTime = egret.getTimer() - this.previousFrameTime;
        this.shootTime += deltaTime;

        this.playerMoveAttack();

        this.previousFrameTime = egret.getTimer();
        this.limitplayerMove();
        //玩家转向
        this.player.moveToByAngle((this.joyR.Angle - 90) * Math.PI / 180);

        if (this.joyR.active) {
            // console.log(" ===== shoot ===== ");
            if(this.player.weaponType != WeaponType.ROTARY_DARTS)
            {
                if (this.shootTime >= this.shootDelay) {
                    this.player.attack();
                    this.shootTime = 0;
                }
            }
        }
        this.battleMgr.update();
        this.mapMgr.Update();
    }


    private playerMoveAttack() {
        // ===== 背景和主玩家的移动 start =====
        let angle: number = this.joyL.Angle;
        let xAxis: number = this.joyL.XAxis;
        let yAxis: number = this.joyL.YAxis;
        let offset: number = this.joyL.Offset;

        //障碍区限制移动start
        let hitPoints = MapManager.getHitItem(this.player, [MapItemType.OBSTACAL], false);
        if (hitPoints) {
            for (let i = 0; i < hitPoints.length; ++i) {
                let hitPoint = hitPoints[i];
                let row = hitPoint.x;
                let col = hitPoint.y;
                let point_ = new egret.Point(this.player.x, this.player.y);
                if (this.player.parent)
                    this.player.parent.localToGlobal(this.player.x, this.player.y, point_);
                let point = MapManager.getRowColOfMap(new egret.Point(point_.x, point_.y), true)
                if (col == point.y) {
                    if (Math.abs(row - point.x) <= 1) {
                        if (row < point.x && yAxis > 0) {
                            yAxis = 0;
                        }
                        else if (row > point.x && yAxis < 0) {
                            yAxis = 0;
                        }
                    }
                }
                if (row == point.x) {
                    if (Math.abs(col - point.y) <= 1) {
                        if (col > point.y && xAxis > 0) {
                            xAxis = 0;
                        }
                        else if (col < point.y && xAxis < 0) {
                            xAxis = 0;
                        }
                    }
                }
            }

        }
        //障碍区限制移动end

        if (!this.player.movableX) {
            this.gameBg.movableX = true;
            this.gameBg.move(xAxis, 0);
        }
        if (!this.player.movableY) {
            this.gameBg.movableY = true;
            this.gameBg.move(0, yAxis);
        }
        if (!this.gameBg.movableX) {
            this.player.movableX = true;
            this.player.move(xAxis, 0, angle, offset);
        }
        if (!this.gameBg.movableY) {
            this.player.movableY = true;
            this.player.move(0, yAxis, angle, offset);
        }
        // ===== 背景和主玩家的移动 end =====

    }


    private onTouchBegin(event: egret.TouchEvent) {
        let touchPoint = new egret.Point(event.stageX, event.stageY);
        if (touchPoint.x < (StageUtils.WIN_WIDTH * 0.5)) {
            if (this.joyL.active) return;
            // console.log(" ===== onViewTouchBegin left ===== ");
            this.joyL.x = touchPoint.x;
            this.joyL.y = touchPoint.y;
            this.joyL.alpha = 1;
            this.joyL.enable(event);
        }
        else {
            if (this.joyR.active) return;
            // console.log(" ===== onViewTouchBegin right ===== ");
            this.joyR.x = touchPoint.x;
            this.joyR.y = touchPoint.y;
            this.joyR.alpha = 1;
            this.joyR.enable(event);
        }
        this.touchEnabled = false;
    }


    public showSkills() {
        this.skillComponents.visible = true;

        //先清一下，省的技能图标累加
        this.skillComponents.removeChildren();
        let skillArr = this.player.getRandomSkills();
        if (skillArr.length == 0) {
            //技能加完了

        }
        else {
            for (let i = 0; i < skillArr.length; ++i) {
                let skill = new SkillComponent(skillArr[i].skillType, skillArr[i].skill);
                this.skillComponents.addChild(skill);
            }
        }
    }


    public playerAddSkill(skillType: WeaponType, skill: number) {
        this.skillComponents.visible = false;
        this.skillComponents.removeChildren();

        switch (skillType) {
            case WeaponType.NONE:
                this.player.attribute.enable(skill);
                break;
            case WeaponType.BOW:
            case WeaponType.SHOTGUN:
            case WeaponType.ROTARY_DARTS:
            case WeaponType.ROTARY_SHIELD:
            case WeaponType.FIREBALL:
                this.player.weapon.enableSkill(skill);
                break
        }

    }

    //玩家死亡
    public showGameEndReLife() {
        this.gameEnd.visible = true;
        this.gameEnd.showRelifePanel();
        //关闭手柄检测
        this.joyL.touchEnd();
        this.joyR.touchEnd();
        this.disableJoystick();
    }

    //玩家复活
    public playerReLife() {
        //激活手柄检测
        this.enableJoystick();
        this.player.reLife();
    }

    /** 打开手柄检测 */
    public enableJoystick() {
        if (!this.stage.hasEventListener(egret.TouchEvent.TOUCH_BEGIN))
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }

    /** 关闭手柄检测 */
    public disableJoystick() {
        if (this.stage.hasEventListener(egret.TouchEvent.TOUCH_BEGIN))
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }

    public showPlayerLvExp() {
        this.lvLabel.text = "Lv:" + this.player.attribute.level;
        this.expMask.width = this.expMaskWidth * (this.player.attribute.exp / this.player.attribute.expMax);
    }

    /** 限制玩家移动，不允许出界 */
    private limitplayerMove() {
        if (this.player.x - this.player.anchorOffsetX <= 0) {
            this.player.x = this.player.anchorOffsetX;
        }
        if (this.player.y - this.player.anchorOffsetY <= 0) {
            this.player.y = this.player.anchorOffsetY;
        }
        if (this.player.x + this.player.anchorOffsetX >= StageUtils.WIN_WIDTH) {
            this.player.x = StageUtils.WIN_WIDTH - this.player.anchorOffsetX;
        }
        if (this.player.y + this.player.anchorOffsetY >= StageUtils.WIN_HEIGHT) {
            this.player.y = StageUtils.WIN_HEIGHT - this.player.anchorOffsetY;
        }
    }



    public destructor() {
        this.joyL.destructor();
        this.joyR.destructor();
        this.gameBg.destructor();
        this.gameEnd.destructor();
        this.battleMgr.destructor();
        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToMain, Main.instance);
        ObjectPool.instance.cleanObjectPool("enemy");
        ObjectPool.instance.cleanObjectPool("property");
        ObjectPool.instance.cleanObjectPool("arrow");
    }
}
window["GameView"] = GameView;