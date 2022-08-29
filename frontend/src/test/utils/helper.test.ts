import {
    createFilteredTitle,
    createGetUrl,
    isEmptyObject,
    truncateString,
} from '../../utils/helper';

test('createGetUrl function', () => {
    let urlProperties = {
        name: 'Megamind',
        group: 'Popular Movies',
        type: 'Sci-Fi',
    };
    let url = createGetUrl('http://localhost:5000/api', urlProperties);
    expect(url).toBe(
        'http://localhost:5000/api?name=Megamind&group=Popular Movies&type=Sci-Fi'
    );

    urlProperties = {
        name: '',
        group: 'Popular Movies',
        type: 'Sci-Fi',
    };
    url = createGetUrl('http://localhost:5000/api', urlProperties);
    expect(url).toBe(
        'http://localhost:5000/api?group=Popular Movies&type=Sci-Fi'
    );

    urlProperties = {
        name: '',
        group: '',
        type: '',
    };
    url = createGetUrl('http://localhost:5000/api', urlProperties);
    expect(url).toBe('http://localhost:5000/api');
});

test('isEmptyObject function', () => {
    let testIsEmptyObject = isEmptyObject({
        name: 'Megamind',
    });
    expect(testIsEmptyObject).toBe(false);

    testIsEmptyObject = isEmptyObject({});
    expect(testIsEmptyObject).toBe(true);
});

test('truncateString function', () => {
    const string = 'abcdefghijkl';
    let testTruncateString = truncateString(string, 4);
    expect(testTruncateString).toBe('abc...');

    testTruncateString = truncateString(string, 12);
    expect(testTruncateString).toBe('abcdefghijkl');

    testTruncateString = truncateString(string, 15);
    expect(testTruncateString).toBe('abcdefghijkl');
});

test('createFilteredTitle function', () => {
    let testCreateFilteredTitle = createFilteredTitle(null, null, null);
    expect(testCreateFilteredTitle).toBe('');

    testCreateFilteredTitle = createFilteredTitle('Megamind', null, null);
    expect(testCreateFilteredTitle).toBe('Megamind');

    testCreateFilteredTitle = createFilteredTitle(null, 'Popular Movies', null);
    expect(testCreateFilteredTitle).toBe('Popular Movies');

    testCreateFilteredTitle = createFilteredTitle(null, null, 'Animation');
    expect(testCreateFilteredTitle).toBe('Animation');

    testCreateFilteredTitle = createFilteredTitle(
        'Megamind',
        'Popular Movies',
        null
    );
    expect(testCreateFilteredTitle).toBe('Megamind & Popular Movies');

    testCreateFilteredTitle = createFilteredTitle(
        null,
        'Popular Movies',
        'Animation'
    );
    expect(testCreateFilteredTitle).toBe('Popular Movies & Animation');

    testCreateFilteredTitle = createFilteredTitle(
        'Megamind',
        'Popular Movies',
        'Animation'
    );
    expect(testCreateFilteredTitle).toBe(
        'Megamind & Popular Movies & Animation'
    );
});
