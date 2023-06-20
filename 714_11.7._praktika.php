<!DOCTYPE html>
<html>
<head>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        th, td {
            padding: 10px;
            text-align: center;
        }

        th, .bold {
            font-weight: bold;
        }

        th {
            background: #eee;
        }

        .gray-background {
            background-color: #f5f5f5;
        }

        .green {
            color: green;
        }

        .red {
            color: red;
        }
    </style>
</head>
<body>
<h1>Задание 1. Таблица истинности PHP</h1>
<table>
    <thead>
    <tr>
        <th>A</th>
        <th>B</th>
        <th>!A</th>
        <th>A OR B</th>
        <th>A AND B</th>
        <th>A XOR B</th>
    </tr>
    </thead>
    <tbody>
    <?php
    // Задаем начальные значения операндов A и B
    $A = 0;
    $B = 0;
    ?>

    <?php for ($i = 0; $i < 4; $i++): ?>
        <tr>
            <td class='bold gray-background'><?php echo $A ?></td>
            <td class='bold gray-background'><?php echo $B ?></td>
            <td><?php echo(!$A ? '<span class="green">true</span>' : '<span class="red">false</span>') ?></td>
            <td><?php echo($A || $B ? '<span class="green">true</span>' : '<span class="red">false</span>') ?></td>
            <td><?php echo($A && $B ? '<span class="green">true</span>' : '<span class="red">false</span>') ?></td>
            <td><?php echo(($A xor $B) ? '<span class="green">true</span>' : '<span class="red">false</span>') ?></td>
        </tr>

        <?php if ($i == 0 || $i == 1): ?>
            <?php $B = 1; ?>
        <?php else: ?>
            <?php $A = 1; ?>
            <?php $B = 0; ?>
        <?php endif; ?>

    <? endfor; ?>
    </tbody>
</table>

<h1>Задание 2. Таблица сравнения</h1>

<h3>Гибкое сравнение в PHP</h3>

<?php
$x = [
    [
        'value' => true,
        'text' => 'true',
    ],
    [
        'value' => false,
        'text' => 'false',
    ],
    [
        'value' => 1,
        'text' => '1',
    ],
    [
        'value' => 0,
        'text' => '0',
    ],
    [
        'value' => -1,
        'text' => '-1',
    ],
    [
        'value' => "1",
        'text' => "1",
    ],
    [
        'value' => null,
        'text' => "null",
    ],
    [
        'value' => "php",
        'text' => "php",
    ],
];

$y = [
    [
        'value' => true,
        'text' => 'true',
    ],
    [
        'value' => false,
        'text' => 'false',
    ],
    [
        'value' => 1,
        'text' => '1',
    ],
    [
        'value' => 0,
        'text' => '0',
    ],
    [
        'value' => -1,
        'text' => '-1',
    ],
    [
        'value' => "1",
        'text' => "1",
    ],
    [
        'value' => null,
        'text' => "null",
    ],
    [
        'value' => "php",
        'text' => "php",
    ],
];
?>
<?php
// Создаем начало таблицы
?>
<table style='table-layout: fixed; width: 900px;'>
    <?php
    // Создаем заголовок таблицы (строку с заголовками столбцов)
    ?>
    <tr>
        <th class='bold gray-background'>&nbsp;</th>
        <?php foreach ($x as $xValue): ?>
            <th><?php echo $xValue['text'] ?></th>
        <?php endforeach; ?>
    </tr>
    <?php
    // Создаем строки таблицы
    ?>
    <?php foreach ($y as $yValue): ?>
        <tr>
            <td class='bold gray-background'><?php echo $yValue['text'] ?></td>
            <?php foreach ($x as $xValue): ?>
                <?php
                // Выполняем сравнение и выводим соответствующее значение в ячейке таблицы
                ?>
                <?php if ($xValue['value'] == $yValue['value']): ?>
                    <td><span class="green">true</span></td>
                <?php else: ?>
                    <td><span class="red">false</span></td>
                <?php endif; ?>
            <?php endforeach; ?>
        </tr>
    <?php endforeach; ?>
    <?php
    // Закрываем таблицу
    ?>
</table>

<h3>Жёсткое сравнение в PHP</h3>
<?php
// Создаем начало таблицы
?>
<table style='table-layout: fixed; width: 900px;'>
    <?php
    // Создаем заголовок таблицы (строку с заголовками столбцов)
    ?>
    <tr>
        <th class='bold gray-background'>&nbsp;</th>
        <?php foreach ($x as $xValue): ?>
            <th><?php echo $xValue['text'] ?></th>
        <?php endforeach; ?>
    </tr>
    <?php
    // Создаем строки таблицы
    ?>
    <?php foreach ($y as $yValue): ?>
        <tr>
            <td class='bold gray-background'><?php echo $yValue['text'] ?></td>
            <?php foreach ($x as $xValue): ?>
                <?php
                // Выполняем сравнение и выводим соответствующее значение в ячейке таблицы
                ?>
                <?php if ($xValue['value'] === $yValue['value']): ?>
                    <td><span class="green">true</span></td>
                <?php else: ?>
                    <td><span class="red">false</span></td>
                <?php endif; ?>
            <?php endforeach; ?>
        </tr>
    <?php endforeach; ?>
    <?php
    // Закрываем таблицу
    ?>
</table>
</body>
</html>