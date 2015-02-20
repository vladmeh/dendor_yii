<?php
/* @var $this NewsController */
/* @var $data News */
?>
<section class="group-item">
	<?php echo CHtml::tag('h2',array('class'=>'h2'),CHtml::link(CHtml::encode($data->name), $data->viewUrl)); ?>
  <div class="row-fluid">
    <div class="span4">
      <div class="item-image img-hover text-center">
        <?php echo CHtml::link(CHtml::image(CatalogGroup::model()->getUploadPath($data->group_id).$data->image), $data->viewUrl); ?>
      </div>
    </div>
    <div class="span7 offset1">
      <div class="main-features-item">

      </div>
    </div>
  </div>
</section>
<div class="line line-dotted"></div>
