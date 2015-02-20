<?php
/* @var $this NewsController */
/* @var $dataProvider CActiveDataProvider */

$this->pageTitle = CHtml::encode($group->meta_title);
$this->metaDescription = CHtml::encode($group->meta_description);
$this->metaKeywords = CHtml::encode($group->meta_keywords);

$this->breadcrumbs=array(
  $group->name,
);

$this->sidebar = CatalogGroup::model()->getListMenu(Yii::t('app','productions'));
?>
<div class="text-item">
  <?php echo CHtml::encode($group->description); ?>
</div>
<div class="line line-dotted"></div>
<?php $this->widget('zii.widgets.CListView', array(
  'dataProvider'=>$dataProvider,
  'itemView'=>'_view',
  'summaryText' => Yii::t('app','page').' {page}',
  'template' => '{items}{pager}{summary}',
  'pager' => array('class' => 'bootstrap.widgets.TbPager'),
  'pagerCssClass' => 'pagination pagination-centered',
)); ?>
